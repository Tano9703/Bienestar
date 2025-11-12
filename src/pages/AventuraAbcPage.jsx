import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { Trash2, Star, MessageSquare, Link, Plus, Paperclip, Pencil, ArrowLeft, Swords } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import LeaderboardPodium from '@/components/tripulaciones/LeaderboardPodium';
import Gamificacion from '@/components/tripulaciones/Gamificacion';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DIMENSIONS = ['Adquisición', 'Colaboración', 'Discusión', 'Exploración', 'Práctica', 'Producción'];

const StarRating = ({ rating, onRatingChange, readOnly = false }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        } ${!readOnly ? 'hover:text-yellow-300' : ''}`}
        onClick={() => !readOnly && onRatingChange(star)}
      />
    ))}
  </div>
);

const AventuraAbcPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDimension, setSelectedDimension] = useState('Exploración');
  const [tasks, setTasks] = useState([]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isGamificacionOpen, setIsGamificacionOpen] = useState(false);
  
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newLink, setNewLink] = useState("");


  useEffect(() => {
    const savedTasks = localStorage.getItem('abcAdventureTasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        const migratedTasks = Array.isArray(parsedTasks) ? parsedTasks.map(task => ({
          ...task,
          rating: task.rating ?? 0,
          comments: task.comments ?? [],
          links: task.links ?? [],
          files: task.files ?? []
        })) : [];
        setTasks(migratedTasks);
      } catch (e) {
        setTasks([]);
      }
    }
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('abcAdventureTasks', JSON.stringify(updatedTasks));
  };

  const handleCreateTask = () => {
    if (!newTask.title) return;
    const taskToAdd = { 
      ...newTask, 
      id: Date.now(), 
      dimension: selectedDimension,
      rating: 0,
      comments: [],
      links: [],
      files: []
    };
    saveTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', description: '', date: '' });
    setIsCreateDialogOpen(false);
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    setIsDetailDialogOpen(false);
  };

  const handleUpdateTask = () => {
    if (!selectedTask) return;
    const updatedTasks = tasks.map(t => t.id === selectedTask.id ? selectedTask : t);
    saveTasks(updatedTasks);
    setIsDetailDialogOpen(false);
  };

  const handleOpenTaskDetails = (task) => {
    setSelectedTask({ ...task });
    setIsDetailDialogOpen(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTask) return;
    const commentToAdd = { id: Date.now(), text: newComment };
    setSelectedTask(prev => ({ ...prev, comments: [...(prev.comments || []), commentToAdd] }));
    setNewComment("");
  };

  const handleAddLink = () => {
    if (!newLink.trim() || !selectedTask) return;
    try {
        new URL(newLink);
        const linkToAdd = { id: Date.now(), url: newLink };
        setSelectedTask(prev => ({ ...prev, links: [...(prev.links || []), linkToAdd] }));
        setNewLink("");
    } catch (_) {
        toast({
            variant: "destructive",
            title: "Enlace inválido",
            description: "Por favor, introduce una URL válida.",
        });
    }
  };

  const radarData = {
    labels: DIMENSIONS,
    datasets: [
      {
        label: 'Tareas por dimensión',
        data: DIMENSIONS.map(dim => tasks.filter(t => t.dimension === dim).length),
        backgroundColor: 'hsla(var(--primary) / 0.2)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        pointBackgroundColor: 'hsl(var(--primary))',
      }
    ]
  };
  
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { r: { angleLines: { color: 'hsl(var(--border))' }, grid: { color: 'hsl(var(--border))' }, pointLabels: { font: { size: 12, weight: 'bold' }, color: 'hsl(var(--foreground))' }, ticks: { backdropColor: 'transparent', color: 'hsl(var(--muted-foreground))', stepSize: 1, }, beginAtZero: true, suggestedMax: Math.max(5, ...DIMENSIONS.map(dim => tasks.filter(t => t.dimension === dim).length))}},
    plugins: { legend: { display: false } }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Planificador Visual de Aprendizaje</h1>
            <p className="mt-1 text-md sm:text-lg text-muted-foreground">Forja tu propia ruta. ¡Esta es tu aventura!</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/tripulaciones')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Regresar a Fases
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="lg:col-span-2 h-96 w-full max-w-3xl mx-auto">
            <Radar data={radarData} options={radarOptions} />
        </motion.div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-center lg:text-left">Selecciona una dimensión</h3>
          {DIMENSIONS.map((dim) => (
            <Button key={dim} variant={dim === selectedDimension ? 'default' : 'outline'} onClick={() => setSelectedDimension(dim)} className="justify-start">
              {dim}
            </Button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <LeaderboardPodium tasks={tasks} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold">Mi Ruta de Aprendizaje</h2>
            <div className="flex items-center gap-2">
              <Dialog open={isGamificacionOpen} onOpenChange={setIsGamificacionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Swords className="h-4 w-4 mr-2" />
                    Mecánicas de Juego
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Tu Progreso en la Aventura</DialogTitle>
                    <DialogDescription>
                      Aquí puedes ver tus puntos, rango y las insignias que has ganado.
                    </DialogDescription>
                  </DialogHeader>
                  <Gamificacion />
                </DialogContent>
              </Dialog>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>➕ Añadir Tarea a "{selectedDimension}"</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader> <DialogTitle>Añadir nueva tarea a "{selectedDimension}"</DialogTitle> </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title-create" className="text-right">Título</Label>
                            <Input id="title-create" placeholder="Título de la tarea" className="col-span-3" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description-create" className="text-right">Descripción</Label>
                            <Textarea id="description-create" placeholder="Descripción (opcional)" className="col-span-3" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date-create" className="text-right">Fecha</Label>
                            <Input id="date-create" type="date" className="col-span-3" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter> <Button onClick={handleCreateTask}>Guardar Tarea</Button> </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <Card key={t.id} className={`flex flex-col transition-all duration-300 ${t.dimension === selectedDimension ? 'border-primary ring-2 ring-primary ring-offset-background' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{t.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                     <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{t.dimension}</span>
                     {t.date && <span className="text-xs text-muted-foreground">📅 {t.date}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                </CardContent>
                <CardFooter className="flex-wrap justify-between items-center gap-2 pt-4">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400"/><span>{t.rating}</span></div>
                        <div className="flex items-center gap-1"><MessageSquare className="h-4 w-4"/><span>{t.comments?.length || 0}</span></div>
                        <div className="flex items-center gap-1"><Link className="h-4 w-4"/><span>{t.links?.length || 0}</span></div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleOpenTaskDetails(t)}>
                        <Pencil className="h-4 w-4 mr-2"/>Editar
                    </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                <p className="font-semibold">¡Tu ruta de aprendizaje está vacía!</p>
                <p className="text-sm mt-2">Selecciona una dimensión y haz clic en "Añadir Tarea" para empezar a construir tu camino.</p>
            </div>
          )}
        </div>
      </motion.div>

      {selectedTask && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Detalles de la Tarea</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title-edit">Título</Label>
                        <Input id="title-edit" value={selectedTask.title} onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description-edit">Descripción</Label>
                        <Textarea id="description-edit" value={selectedTask.description} onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date-edit">Fecha</Label>
                        <Input id="date-edit" type="date" value={selectedTask.date} onChange={(e) => setSelectedTask({...selectedTask, date: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Nivel de Logro</Label>
                        <StarRating rating={selectedTask.rating} onRatingChange={(r) => setSelectedTask({...selectedTask, rating: r})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Evidencia</Label>
                        <div className="flex gap-2">
                            <Input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="https://ejemplo.com"/>
                            <Button onClick={handleAddLink}><Plus className="h-4 w-4 mr-2"/>Añadir Enlace</Button>
                            <Button variant="outline" onClick={() => toast({ title: "🚧 ¡Función en desarrollo!", description: "Pronto podrás adjuntar archivos directamente." })}>
                                <Paperclip className="h-4 w-4 mr-2"/> Adjuntar Archivo
                            </Button>
                        </div>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {selectedTask.links?.map(link => <li key={link.id}><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{link.url}</a></li>)}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <Label>Comentarios</Label>
                        <div className="flex gap-2">
                            <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Añadir un comentario..."/>
                            <Button onClick={handleAddComment}><Plus className="h-4 w-4 mr-2"/>Comentar</Button>
                        </div>
                        <div className="max-h-32 overflow-y-auto space-y-2 mt-2 bg-muted/50 p-2 rounded-md">
                            {selectedTask.comments?.map(comment => <p key={comment.id} className="text-sm border-b pb-1">{comment.text}</p>)}
                            {(selectedTask.comments?.length || 0) === 0 && <p className="text-sm text-muted-foreground text-center">No hay comentarios aún.</p>}
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4 pt-4 border-t">
                    <Button variant="destructive" onClick={() => handleDeleteTask(selectedTask.id)}><Trash2 className="h-4 w-4 mr-2"/>Eliminar</Button>
                    <div className="flex-grow"></div>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleUpdateTask}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AventuraAbcPage;