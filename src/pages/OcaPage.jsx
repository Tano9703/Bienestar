import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  PlayCircle, HelpCircle, BookOpen, Users, Brain, HeartHandshake as Handshake, Map, CheckSquare, 
  Home, Search, Bell, UserCircle, ChevronRight, Folder, Settings, BarChart2, Calendar, MessageSquare, Library, Edit3, Award, Briefcase, LayoutDashboard
} from 'lucide-react';

const pymeName = "TuPYME"; 

const initialModules = [
  {
    id: "landing",
    title: "Landing Onboarding",
    icon: PlayCircle,
    objective: "Dar la bienvenida y preparar al nuevo colaborador antes del primer día de trabajo.",
    activities: [
      "Vídeo introductorio: “Tu ruta de inducción”",
      "Quiz diagnóstico: “¿Qué sabes de nuestra cultura?”",
      "Descarga de políticas y reglamento interno (PDF)"
    ],
    duration: "2–3 días antes de la firma del contrato",
    progress: "Badge “Pre-Onboarding completado”"
  },
  {
    id: "adn",
    title: "Módulo 1: Nuestro ADN y Cultura Organizacional",
    icon: BookOpen,
    objective: "Comprender historia, misión, visión y valores de la empresa.",
    activities: [
      "Storytelling interactivo de la historia corporativa",
      "Infografías de valores y rituales",
      "Foro de reflexión: “¿Qué valor resuena más contigo?”"
    ],
    duration: "1 semana (autónomo)",
    progress: "Quiz de 5 preguntas + comentario en foro"
  },
  {
    id: "powerskills",
    title: "Módulo 2: Power Skills & Liderazgo en Comunidad",
    icon: Brain,
    objective: "Desarrollar pensamiento crítico, comunicación y colaboración.",
    activities: [
      "Micro-cursos SCORM (Heart, Mind, Will)",
      "Autodiagnóstico de estilo de liderazgo",
      "Actividades de co-creación en grupos virtuales"
    ],
    duration: "1 semana (blended)",
    progress: "Autoevaluación + entrega de actividad grupal"
  },
  {
    id: "comunidades",
    title: "Módulo 3: Comunidades de Práctica (Metodología ABC)",
    icon: Users,
    objective: "Conectar al colaborador con su ecosistema y roles clave.",
    activities: [
      "Sesiones “Arena” por rol/área",
      "Talleres sincrónicos (Blended)",
      "Biblioteca digital de casos reales"
    ],
    duration: "2 semanas (mixto)",
    progress: "Informe de participación + evidencias de proyectos"
  },
  {
    id: "experiencia",
    title: "Módulo 4: Experiencia Vivencial y Feedback",
    icon: Map,
    objective: "Facilitar la adaptación mediante dinámicas experienciales.",
    activities: [
      "Escape room cultural (virtual/presencial)",
      "Diario digital de campo (journaling)",
      "Feedback 360° con jefe y mentor"
    ],
    duration: "Semana 2–4 (on the job)",
    progress: "Entradas de diario + acta de feedback firmada"
  },
  {
    id: "mentoria",
    title: "Módulo 5: Mentoría y Plan de Desarrollo",
    icon: Handshake,
    objective: "Definir brechas y rutas de crecimiento personalizadas.",
    activities: [
      "Asignación de “buddy” y mentor",
      "Creación de OKR personales",
      "Reuniones quincenales de seguimiento"
    ],
    duration: "Primeros 3 meses",
    progress: "Registro de reuniones + actualización de OKR"
  },
  {
    id: "evaluacion",
    title: "Módulo 6: Evaluación del Período de Prueba",
    icon: CheckSquare,
    objective: "Estandarizar la aprobación del periodo de prueba.",
    activities: [
      "Check-list de competencias y entregables",
      "Reporte automático de progreso",
      "Encuesta de satisfacción (colaborador y líder)"
    ],
    duration: "Al finalizar mes 3",
    progress: "Informe de evaluación + firma electrónica"
  }
];

const OcaPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Módulos de Inducción");
  const [selectedModule, setSelectedModule] = useState(initialModules[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["Inicio", "Módulos de Inducción", "Comunidad", "Resultados", "Más"];

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const filteredModules = initialModules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.objective.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (!selectedModule) {
      return <div className="text-center py-10 text-muted-foreground">Selecciona un módulo para ver los detalles.</div>;
    }
    const ModuleIcon = selectedModule.icon || HelpCircle;
    return (
      <motion.div
        key={selectedModule.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0 pb-4 mb-4">
            <div className="flex items-center text-primary">
              <ModuleIcon size={28} className="mr-3 text-primary" />
              <CardTitle className="text-2xl font-bold text-primary">{selectedModule.title}</CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground mt-1 italic">{selectedModule.objective}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                <Library size={20} className="mr-2 text-primary" /> Contenidos y Actividades
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                {selectedModule.activities.map((activity, i) => (
                  <li key={i} className="text-sm">{activity}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p className="text-muted-foreground"><strong className="text-foreground">Duración estimada:</strong> {selectedModule.duration}</p>
              <p className="text-muted-foreground"><strong className="text-foreground">Registro de avance:</strong> {selectedModule.progress}</p>
            </div>
            <Button className="bg-primary hover:opacity-90 text-primary-foreground mt-4">
              Acceder al Módulo <ChevronRight size={18} className="ml-2"/>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-foreground">
      <header className="bg-primary text-primary-foreground p-3 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
                <Home size={20}/>
             </Button>
            <h1 className="text-lg font-semibold hidden sm:block">OCA</h1>
            <ChevronRight size={20} className="mx-1 opacity-70 hidden sm:block" />
            <span className="text-lg font-semibold">Onboarding e Inducción basada en Cultura</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Input 
                type="search" 
                placeholder="Buscar módulos..." 
                className="bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 border-0 focus:bg-primary-foreground/30 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70" />
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <UserCircle size={22} />
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-secondary text-secondary-foreground shadow-sm sticky top-[60px] z-30">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex">
            {tabs.map(tab => (
              <Button 
                key={tab} 
                variant="ghost" 
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm rounded-none font-medium h-auto
                  ${activeTab === tab 
                    ? 'text-primary-foreground bg-primary/80 border-b-2 border-primary-foreground' 
                    : 'text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-primary/60'
                  }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex-grow container mx-auto py-4 sm:py-6 px-2 sm:px-4">
        <div className="md:grid md:grid-cols-12 md:gap-4 sm:gap-6 h-full">
          <aside className="md:col-span-3 bg-card p-3 sm:p-4 rounded-lg shadow-md border-border mb-4 md:mb-0 h-fit sticky top-[112px] z-20">
            <h2 className="text-md sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
              <Folder size={18} className="mr-2 text-primary" />
              Módulos de Inducción
            </h2>
            <nav className="space-y-1">
              {filteredModules.map((module) => {
                const ModuleIcon = module.icon || HelpCircle;
                return (
                  <Button
                    key={module.id}
                    variant={selectedModule?.id === module.id ? "default" : "ghost"}
                    className={`w-full justify-start items-center text-xs sm:text-sm h-auto py-1.5 px-2
                      ${selectedModule?.id === module.id 
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'text-foreground hover:text-primary hover:bg-primary/10'
                      }`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    <ModuleIcon size={16} className={`mr-2 flex-shrink-0 ${selectedModule?.id === module.id ? '' : 'text-primary'}`} />
                    <span className="truncate">{module.title}</span>
                    {selectedModule?.id === module.id && <ChevronRight size={14} className="ml-auto" />}
                  </Button>
                );
              })}
            </nav>
            <div className="mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/')}>
                    <LayoutDashboard size={16} className="mr-2"/> Ver Dashboard General
                </Button>
            </div>
          </aside>

          <main className="md:col-span-9 bg-card p-3 sm:p-6 rounded-lg shadow-md border-border">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {activeTab}: {selectedModule ? selectedModule.title : "Bienvenido"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
              Tu ruta de integración desde el primer día en {pymeName}.
            </p>
            {activeTab === "Módulos de Inducción" ? renderContent() : (
                 <div className="text-center py-10 text-muted-foreground">
                    Contenido para la pestaña "{activeTab}" estará disponible pronto.
                    {activeTab === "Inicio" && <CheckSquare className="mx-auto text-primary h-16 w-16 mt-4" />}
                 </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default OcaPage;