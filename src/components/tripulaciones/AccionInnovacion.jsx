import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb, Plus, Trash2, Vote, BarChart3, Pencil, Save, X, MessageSquare, Paperclip, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IdeaCard = ({ idea, updateIdea, deleteIdea, voteOnIdea, isVotingTab, hasVoted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(idea.text);
  const [newComment, setNewComment] = useState("");
  const [newLink, setNewLink] = useState("");
  const { toast } = useToast();

  const handleSaveEdit = () => {
    if (editedText.trim() === "") {
      toast({ title: "La idea no puede estar vacía.", variant: "destructive" });
      return;
    }
    updateIdea({ ...idea, text: editedText });
    setIsEditing(false);
    toast({ title: "Idea actualizada." });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const comment = { id: Date.now(), text: newComment };
    updateIdea({ ...idea, comments: [...(idea.comments || []), comment] });
    setNewComment("");
    toast({ title: "Comentario añadido." });
  };

  const handleAddLink = () => {
    if (newLink.trim() === "") return;
    try {
      new URL(newLink);
      const attachment = { id: Date.now(), type: 'link', name: newLink, url: newLink };
      updateIdea({ ...idea, attachments: [...(idea.attachments || []), attachment] });
      setNewLink("");
      toast({ title: "Enlace añadido." });
    } catch (_) {
      toast({ title: "URL inválida.", description: "Por favor, introduce un enlace válido.", variant: "destructive" });
    }
  };
  
  const handleFileUpload = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "La carga de archivos estará disponible próximamente.",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-card hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4 flex-grow">
          {isEditing ? (
            <div className="space-y-2">
              <Textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} className="min-h-[100px]" />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}><X className="h-4 w-4 mr-1" /> Cancelar</Button>
                <Button size="sm" onClick={handleSaveEdit}><Save className="h-4 w-4 mr-1" /> Guardar</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm">{idea.text}</p>
          )}
        </CardContent>
        <CardFooter className="p-2 border-t flex flex-col items-start space-y-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm"><MessageSquare className="h-4 w-4 mr-1" /> {idea.comments?.length || 0}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Comentarios</DialogTitle></DialogHeader>
                  <div className="max-h-60 overflow-y-auto space-y-2 p-1">
                    {idea.comments?.length > 0 ? idea.comments.map(c => (
                      <div key={c.id} className="text-sm bg-muted p-2 rounded-md">{c.text}</div>
                    )) : <p className="text-sm text-muted-foreground">No hay comentarios aún.</p>}
                  </div>
                  <div className="flex gap-2">
                    <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Añade un comentario..." />
                    <Button onClick={handleAddComment}>Enviar</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4 mr-1" /> {idea.attachments?.length || 0}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Adjuntos</DialogTitle></DialogHeader>
                  <div className="max-h-60 overflow-y-auto space-y-2 p-1">
                    {idea.attachments?.length > 0 ? idea.attachments.map(a => (
                      <div key={a.id} className="text-sm bg-muted p-2 rounded-md">
                        <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{a.name}</a>
                      </div>
                    )) : <p className="text-sm text-muted-foreground">No hay adjuntos.</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Añadir enlace</Label>
                    <div className="flex gap-2">
                      <Input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="https://ejemplo.com" />
                      <Button onClick={handleAddLink}><LinkIcon className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleFileUpload} className="w-full">Cargar archivo (próximamente)</Button>
                </DialogContent>
              </Dialog>
            </div>
            {!isEditing && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}><Pencil className="h-4 w-4" /></Button>
            )}
          </div>
          <div className="w-full border-t pt-2">
            {isVotingTab ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-bold text-primary">{idea.votes} Voto(s)</span>
                <Button onClick={() => voteOnIdea(idea.id)} size="sm" disabled={hasVoted}>
                  {hasVoted ? 'Votado' : <><Vote className="mr-2 h-4 w-4" /> Votar</>}
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteIdea(idea.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PizarraDeIdeas = ({ ideas, setIdeas }) => {
  const [newIdea, setNewIdea] = useState('');
  const { toast } = useToast();

  const addIdea = () => {
    if (newIdea.trim() === '') {
      toast({
        title: '🤔 Idea vacía',
        description: 'Por favor, escribe una idea antes de agregarla.',
        variant: 'destructive',
      });
      return;
    }
    const updatedIdeas = [...ideas, { id: Date.now(), text: newIdea.trim(), votes: 0, comments: [], attachments: [] }];
    setIdeas(updatedIdeas);
    setNewIdea('');
    toast({
      title: '✨ ¡Idea agregada!',
      description: 'Tu idea ahora está en la pizarra.',
    });
  };

  const updateIdea = (updatedIdea) => {
    const newIdeas = ideas.map(i => i.id === updatedIdea.id ? updatedIdea : i);
    setIdeas(newIdeas);
  };

  const deleteIdea = (id) => {
    const updatedIdeas = ideas.filter(idea => idea.id !== id);
    setIdeas(updatedIdeas);
    toast({
      title: '🗑️ Idea eliminada',
      description: 'La idea ha sido removida de la pizarra.',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Escribe tu brillante idea aquí..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addIdea()}
        />
        <Button onClick={addIdea}><Plus className="mr-2 h-4 w-4" /> Agregar</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} updateIdea={updateIdea} deleteIdea={deleteIdea} />
        ))}
        {ideas.length === 0 && (
          <div className="text-muted-foreground col-span-full flex items-center justify-center">
            <p>Aún no hay ideas. ¡Sé el primero en proponer una!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Votacion = ({ ideas, setIdeas }) => {
  const { toast } = useToast();
  const [votedIdeas, setVotedIdeas] = useState([]);

  useEffect(() => {
    try {
      const storedVotedIdeas = localStorage.getItem('innovationVotedIdeas');
      if (storedVotedIdeas) {
        setVotedIdeas(JSON.parse(storedVotedIdeas));
      }
    } catch (error) {
      console.error("Failed to parse voted ideas from localStorage", error);
      setVotedIdeas([]);
    }
  }, []);

  const updateIdea = (updatedIdea) => {
    const newIdeas = ideas.map(i => i.id === updatedIdea.id ? updatedIdea : i);
    setIdeas(newIdeas);
  };

  const voteOnIdea = (id) => {
    if (votedIdeas.includes(id)) {
      toast({
        title: '🚫 Voto duplicado',
        description: 'Ya has votado por esta idea.',
        variant: 'destructive',
      });
      return;
    }

    const updatedIdeas = ideas.map(idea =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    );
    setIdeas(updatedIdeas);

    const newVotedIdeas = [...votedIdeas, id];
    setVotedIdeas(newVotedIdeas);
    localStorage.setItem('innovationVotedIdeas', JSON.stringify(newVotedIdeas));

    toast({
      title: '🗳️ ¡Voto registrado!',
      description: 'Gracias por tu contribución.',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
      {ideas.map((idea) => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          updateIdea={updateIdea} 
          voteOnIdea={voteOnIdea}
          isVotingTab={true}
          hasVoted={votedIdeas.includes(idea.id)}
        />
      ))}
      {ideas.length === 0 && (
        <div className="text-muted-foreground col-span-full flex items-center justify-center">
          <p>No hay ideas para votar. ¡Agrega algunas en la Pizarra de Ideas!</p>
        </div>
      )}
    </div>
  );
};

const Resultados = ({ ideas }) => {
  const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);

  const data = {
    labels: sortedIdeas.map(idea => idea.text.length > 30 ? idea.text.substring(0, 27) + '...' : idea.text),
    datasets: [
      {
        label: 'Votos',
        data: sortedIdeas.map(idea => idea.votes),
        backgroundColor: 'rgba(76, 144, 226, 0.6)',
        borderColor: 'rgba(76, 144, 226, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Resultados de la Votación',
        font: {
          size: 16,
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-4 h-[400px]">
        {ideas.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="text-muted-foreground h-full flex items-center justify-center">
            <p>No hay resultados para mostrar. ¡Vota por tus ideas favoritas!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AccionInnovacion = ({ description }) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    try {
      const storedIdeas = localStorage.getItem('innovationIdeas');
      if (storedIdeas) {
        setIdeas(JSON.parse(storedIdeas));
      }
    } catch (error) {
      console.error("Failed to parse ideas from localStorage", error);
      setIdeas([]);
    }
  }, []);

  const updateAndStoreIdeas = (newIdeas) => {
    setIdeas(newIdeas);
    localStorage.setItem('innovationIdeas', JSON.stringify(newIdeas));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{description}</p>
      <Tabs defaultValue="pizarra" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pizarra"><Lightbulb className="mr-2 h-4 w-4" /> Pizarra de Ideas</TabsTrigger>
          <TabsTrigger value="votacion"><Vote className="mr-2 h-4 w-4" /> Votación</TabsTrigger>
          <TabsTrigger value="resultados"><BarChart3 className="mr-2 h-4 w-4" /> Resultados</TabsTrigger>
        </TabsList>
        <TabsContent value="pizarra" className="mt-4">
          <PizarraDeIdeas ideas={ideas} setIdeas={updateAndStoreIdeas} />
        </TabsContent>
        <TabsContent value="votacion" className="mt-4">
          <Votacion ideas={ideas} setIdeas={updateAndStoreIdeas} />
        </TabsContent>
        <TabsContent value="resultados" className="mt-4">
          <Resultados ideas={ideas} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccionInnovacion;