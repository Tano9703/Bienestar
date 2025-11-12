import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import {
    Users, Settings, Target, BarChart3, Search, SlidersHorizontal, User, Star, MapPin, 
    Book, Send, UserPlus, FileDown, Bell, MessageSquare, Briefcase, CalendarDays, CheckCircle, BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const skillsToDevelop = [
  'Liderazgo de Proyectos', 
  'Diseño de Producto', 
  'Negociación', 
  'Análisis de Datos con Python',
  'Marketing Digital'
];

const mentorsData = [
  { id: 'm1', name: 'Ana García', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', masteredSkills: ['Liderazgo de Proyectos', 'Negociación'] },
  { id: 'm2', name: 'Luis Martinez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', masteredSkills: ['Análisis de Datos con Python', 'Finanzas', 'Startup'] },
  { id: 'm3', name: 'Sofia Lopez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', masteredSkills: ['Diseño de Producto', 'Marketing Digital', 'SEO'] },
  { id: 'm4', name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', masteredSkills: ['Liderazgo de Proyectos', 'Análisis de Datos con Python'] },
  { id: 'm5', name: 'Elena Petrova', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g', masteredSkills: ['Diseño de Producto', 'UX Design'] },
];

const SkillMatchingContent = () => {
  const { toast } = useToast();
  const [matches, setMatches] = useState({});

  const handleSelectMentor = (skill, mentorId) => {
    setMatches(prev => ({ ...prev, [skill]: mentorId }));
  };
  
  const handleSaveChanges = () => {
    if (Object.keys(matches).length === 0) {
      toast({
        variant: "destructive",
        title: "Sin cambios",
        description: "No has seleccionado ningún match para guardar.",
      });
      return;
    }
    console.log("Matches saved:", matches);
    toast({
      title: "¡Matches Guardados!",
      description: "Tus preferencias de mentoría han sido actualizadas.",
    });
  };

  return (
    <>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
        {skillsToDevelop.map(skill => {
          const availableMentors = mentorsData.filter(m => m.masteredSkills.includes(skill));
          return (
            <div key={skill} className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={skill} className="text-right col-span-1 truncate">
                {skill}
              </Label>
              <Select onValueChange={(value) => handleSelectMentor(skill, value)} value={matches[skill] || ""}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Selecciona un mentor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableMentors.length > 0 ? (
                      availableMentors.map(mentor => (
                        <SelectItem key={mentor.id} value={mentor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={mentor.avatar} />
                              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{mentor.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-mentor" disabled>
                        No hay mentores disponibles
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
      <DialogFooter>
        <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
      </DialogFooter>
    </>
  );
};

const DashboardView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mentores & Mentees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78% Match Activos</div>
          <p className="text-xs text-muted-foreground">+15% que el mes pasado</p>
          <Progress value={78} className="mt-4 h-2" />
          <div className="flex justify-between mt-4">
            <Button size="sm" variant="outline">Ver perfiles</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Configurar matches</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Configurar Matches por Habilidad</DialogTitle>
                  <DialogDescription>
                    Selecciona un mentor con maestría en cada habilidad que deseas desarrollar.
                  </DialogDescription>
                </DialogHeader>
                <SkillMatchingContent />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participación & Feedback</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">NPS: 4.7/5.0</div>
          <p className="text-xs text-muted-foreground">Tasa de participación: 92%</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-destructive">3 Alertas de bajo engagement</span>
          </div>
           <div className="flex justify-between mt-4">
            <Button size="sm" variant="outline">Ver feedback</Button>
            <Button size="sm" variant="destructive">Enviar recordatorio</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cumplimiento de Objetivos SMART</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">65% Completado</div>
          <p className="text-xs text-muted-foreground">23 de 35 objetivos en progreso</p>
          <Progress value={65} className="mt-4 h-2" />
          <div className="flex justify-between mt-4">
            <Button size="sm" variant="outline">Ver objetivos</Button>
            <Button size="sm">Actualizar avance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const MatchingConfigView = () => {
  const { toast } = useToast();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
       <Card>
        <CardHeader>
            <CardTitle>Configuración de Matching</CardTitle>
            <CardDescription>Selecciona las modalidades de emparejamiento para tu organización.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Auto Match</Label>
                    <p className="text-sm text-muted-foreground">Emparejamiento automático basado en IA.</p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Self Match</Label>
                    <p className="text-sm text-muted-foreground">Los usuarios eligen sus propios mentores/mentees.</p>
                </div>
                <Switch />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Sugerencias Inteligentes</Label>
                    <p className="text-sm text-muted-foreground">La IA sugiere los mejores matches a los usuarios.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <Card className="bg-muted/40">
                <CardHeader>
                    <CardTitle className="text-base">Vista Previa de Sugerencias</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    <p>Ana (Mentee) &rarr; Carlos (Mentor) | Afinidad: 95% (Skills, Objetivos)</p>
                    <p>Luis (Mentee) &rarr; Sofía (Mentor) | Afinidad: 92% (Industria, Disponibilidad)</p>
                </CardContent>
            </Card>
        </CardContent>
       </Card>
       <div className="flex justify-end mt-6">
          <Button onClick={() => toast({ title: "Configuración guardada", description: "Los cambios se han aplicado correctamente." })}>
            Guardar Configuración
          </Button>
       </div>
    </motion.div>
  )
};

const profiles = [
  { name: 'Ana García', role: 'Mentor', skills: ['Liderazgo', 'UX Design'], exp: '10 años', location: 'Madrid', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
  { name: 'Carlos Rodriguez', role: 'Mentee', skills: ['React', 'Project Management'], exp: '2 años', location: 'Barcelona', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { name: 'Sofia Lopez', role: 'Mentor', skills: ['Marketing Digital', 'SEO'], exp: '8 años', location: 'Valencia', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
  { name: 'Luis Martinez', role: 'Mentor', skills: ['Finanzas', 'Startup'], exp: '15 años', location: 'Remoto', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Laura Sanchez', role: 'Mentee', skills: ['Python', 'Data Science'], exp: '1 año', location: 'Sevilla', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
];

const ProfileManagementView = () => {
  const { toast } = useToast();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre, skill, etc." className="pl-10" />
        </div>
        <Button variant="outline" className="flex-shrink-0">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtros Avanzados
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map(p => (
          <Card key={p.name}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={p.avatar} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <CardDescription>{p.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-muted-foreground" /> {p.skills.join(', ')}</div>
              <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> {p.exp} de experiencia</div>
              <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> {p.location}</div>
              <Button className="w-full mt-4" onClick={() => toast({title: "Match Creado!", description: "🚧 Arrastrar y soltar no está implementado. Puedes solicitarlo en tu próximo prompt! 🚀"})}>
                <UserPlus className="mr-2 h-4 w-4" /> Match
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
};

const MetricsView = () => {
    const participationData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Tasa de Participación (%)',
            data: [75, 80, 82, 88, 90, 92],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
        }],
    };
    const feedbackData = {
        labels: ['Excelente', 'Bueno', 'Regular', 'Malo'],
        datasets: [{
            data: [120, 60, 15, 5],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
        }]
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h3 className="text-2xl font-bold">Dashboards y Métricas</h3>
                <div className="flex gap-2">
                    <Select defaultValue="quarter">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por periodo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">Este mes</SelectItem>
                            <SelectItem value="quarter">Este trimestre</SelectItem>
                            <SelectItem value="year">Este año</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Exportar</Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Participación Mensual</CardTitle></CardHeader>
                    <CardContent><Bar data={participationData} /></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Feedback General (NPS)</CardTitle></CardHeader>
                    <CardContent className="h-64 flex justify-center"><Doughnut data={feedbackData} options={{ maintainAspectRatio: false }} /></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Alertas Recientes</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    <div className="text-destructive text-sm flex items-center"><Bell className="mr-2 h-4 w-4" />Bajo engagement en el equipo de Marketing (últimas 2 semanas).</div>
                    <div className="text-amber-600 text-sm flex items-center"><Bell className="mr-2 h-4 w-4" />Objetivo "Desarrollo de API" de Juan P. sin actualizar hace 10 días.</div>
                </CardContent>
            </Card>
        </motion.div>
    );
};


const RedDeMentoresPage = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Red de Mentores</h1>
                    <p className="text-muted-foreground mt-1">Plataforma de gestión de mentorías y emparejamiento.</p>
                </div>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="dashboard"><BarChart3 className="mr-2 h-4 w-4" /> Dashboard</TabsTrigger>
                    <TabsTrigger value="config"><Settings className="mr-2 h-4 w-4" /> Configuración</TabsTrigger>
                    <TabsTrigger value="profiles"><Users className="mr-2 h-4 w-4" /> Perfiles</TabsTrigger>
                    <TabsTrigger value="metrics"><BrainCircuit className="mr-2 h-4 w-4" /> Métricas</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-6"><DashboardView /></TabsContent>
                <TabsContent value="config" className="mt-6"><MatchingConfigView /></TabsContent>
                <TabsContent value="profiles" className="mt-6"><ProfileManagementView /></TabsContent>
                <TabsContent value="metrics" className="mt-6"><MetricsView /></TabsContent>
            </Tabs>
        </div>

        <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
            onClick={() => toast({ title: "Enviar Feedback", description: "🚧 Esta funcionalidad aún no está implementada." })}
        >
            <MessageSquare className="h-6 w-6" />
        </Button>
    </div>
  );
};

export default RedDeMentoresPage;