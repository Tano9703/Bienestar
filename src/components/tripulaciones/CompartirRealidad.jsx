import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, MessageSquare, BarChart, Video, Upload, Send, Plus, Trash2, CheckCircle, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgramacionSesiones = () => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedSessions = localStorage.getItem('feedbackSessions');
    if (storedSessions) setSessions(JSON.parse(storedSessions));
  }, []);

  const saveSessions = (newSessions) => {
    setSessions(newSessions);
    localStorage.setItem('feedbackSessions', JSON.stringify(newSessions));
  };

  const handleSchedule = () => {
    const newSession = { id: Date.now(), date, title: 'Nueva Sesión de Feedback' };
    saveSessions([...sessions, newSession]);
    toast({ title: '✅ Sesión Agendada', description: `Se agendó una sesión para el ${format(date, 'PPP', { locale: es })}.` });
  };

  const handleSync = (calendar) => {
    toast({
      title: `🚧 Sincronizando con ${calendar}`,
      description: "Esta función requiere una integración de backend. ¡Pide esta mejora cuando quieras!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programación de Sesiones</CardTitle>
        <CardDescription>Agenda reuniones, sincroniza con tu calendario y gestiona tus citas.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            locale={es}
          />
          <Button onClick={handleSchedule} className="w-full mt-4">Agendar Sesión para el {format(date, 'PPP', { locale: es })}</Button>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" className="w-full" onClick={() => handleSync('Google Calendar')}>Sincronizar con Google</Button>
            <Button variant="outline" className="w-full" onClick={() => handleSync('Outlook')}>Sincronizar con Outlook</Button>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Sesiones Agendadas</h4>
          {sessions.length > 0 ? sessions.map(s => (
            <div key={s.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
              <p>{s.title} - {format(new Date(s.date), 'PPP p', { locale: es })}</p>
              <Button variant="ghost" size="icon" onClick={() => saveSessions(sessions.filter(ses => ses.id !== s.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          )) : <p className="text-sm text-muted-foreground">No hay sesiones agendadas.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

const ComunicacionMulticanal = () => {
  const { toast } = useToast();
  const handleAction = (action) => {
    toast({
      title: `🚧 Iniciando ${action}`,
      description: "Esta función requiere una integración de backend. ¡Pide esta mejora cuando quieras!",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacte un miembro de su tripulación</CardTitle>
        <CardDescription>Haga clic en el mimbro de su equipo del que desea recibir feedback</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button className="flex-1" onClick={() => handleAction('Videollamada')}><Video className="mr-2 h-4 w-4" /> Iniciar Videollamada</Button>
          <Button variant="secondary" className="flex-1"><MessageSquare className="mr-2 h-4 w-4" /> Abrir Chat</Button>
        </div>
        <div>
          <Label htmlFor="file-upload">Compartir Documentos</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input id="file-upload" type="file" className="flex-1" />
            <Button variant="outline" onClick={() => handleAction('Subida de Archivo')}><Upload className="mr-2 h-4 w-4" /> Subir</Button>
          </div>
        </div>
        <div className="p-4 border rounded-lg h-48 overflow-y-auto bg-muted/50">
          <p className="text-sm text-muted-foreground">El chat en tiempo real aparecerá aquí.</p>
        </div>
      </CardContent>
    </Card>
  );
};

const SeguimientoProgreso = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    const storedGoals = localStorage.getItem('menteeGoals');
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  }, []);

  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem('menteeGoals', JSON.stringify(newGoals));
  };

  const addGoal = () => {
    if (newGoal.trim() === '') return;
    saveGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    saveGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const chartData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [{
      label: 'Tareas Completadas',
      data: [5, 9, 7, 8],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento y Evaluación</CardTitle>
        <CardDescription>Visualiza el progreso, establece metas y analiza la efectividad.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Progreso General</h4>
          <div className="p-4 border rounded-lg">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Objetivos y Metas</h4>
          <div className="flex gap-2 mb-4">
            <Input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Nuevo objetivo..." />
            <Button onClick={addGoal}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-2">
            {goals.map(goal => (
              <div key={goal.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <p className={`${goal.completed ? 'line-through text-muted-foreground' : ''}`}>{goal.text}</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleGoal(goal.id)}>
                    <CheckCircle className={`h-4 w-4 ${goal.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => saveGoals(goals.filter(g => g.id !== goal.id))}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CompartirRealidad = ({ description }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{description}</p>
      <Tabs defaultValue="programacion" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="programacion"><Calendar className="mr-2 h-4 w-4" /> Programación</TabsTrigger>
          <TabsTrigger value="comunicacion"><MessageSquare className="mr-2 h-4 w-4" /> Comunicación</TabsTrigger>
          <TabsTrigger value="seguimiento"><BarChart className="mr-2 h-4 w-4" /> Seguimiento</TabsTrigger>
        </TabsList>
        <TabsContent value="programacion">
          <ProgramacionSesiones />
        </TabsContent>
        <TabsContent value="comunicacion">
          <ComunicacionMulticanal />
        </TabsContent>
        <TabsContent value="seguimiento">
          <SeguimientoProgreso />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompartirRealidad;