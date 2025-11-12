import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Search, Bell, Settings, ChevronRight, Lightbulb, Users, Puzzle, BarChart2, Zap, Folder, Edit3, Maximize, Minimize, ArrowRightLeft } from 'lucide-react';

const lxdContent = {
  title: "Plataforma LXD para Diseño de Experiencias de Aprendizaje",
  breadcrumb: ["LXD", "Diseño de eXperiencias de Aprendizaje"],
  tabs: [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "herramientas", label: "Herramientas LXD", icon: Puzzle },
    { id: "comunidad", label: "Comunidad", icon: Users },
    { id: "analiticas", label: "Analíticas", icon: BarChart2 },
  ],
  sections: [
    {
      id: "diagnostico",
      title: "Diagnóstico y Diseño Instruccional",
      icon: Lightbulb,
      description: "Herramientas para identificar necesidades y diseñar rutas de aprendizaje efectivas.",
      items: [
        { name: "Mapas de Empatía", details: "Comprende a tu audiencia objetivo." },
        { name: "Matrices de Competencias", details: "Define los skills a desarrollar." },
        { name: "Storyboarding Visual", details: "Planifica la narrativa del aprendizaje." },
      ],
    },
    {
      id: "contenido",
      title: "Creación de Contenido Interactivo",
      icon: Edit3,
      description: "Plataformas para desarrollar recursos multimedia y actividades engaging.",
      items: [
        { name: "Simulaciones y Escenarios", details: "Aprendizaje basado en la práctica." },
        { name: "Gamificación y Badges", details: "Motiva y reconoce el progreso." },
        { name: "Vídeos Interactivos", details: "Contenido dinámico con preguntas y feedback." },
      ],
    },
    {
      id: "colaboracion",
      title: "Fomento de la Colaboración",
      icon: Users,
      description: "Espacios para el aprendizaje social y la co-creación.",
      items: [
        { name: "Foros de Discusión Temáticos", details: "Intercambio de ideas y resolución de dudas." },
        { name: "Proyectos Grupales", details: "Desarrollo de habilidades de equipo." },
        { name: "Comunidades de Práctica", details: "Conexión con pares y expertos." },
      ],
    },
    {
      id: "evaluacion",
      title: "Evaluación y Retroalimentación",
      icon: BarChart2,
      description: "Mecanismos para medir el aprendizaje y ofrecer feedback constructivo.",
      items: [
        { name: "Quizzes y Pruebas Adaptativas", details: "Evaluaciones personalizadas." },
        { name: "Evaluación por Pares (Peer Review)", details: "Feedback colaborativo." },
        { name: "Dashboards de Progreso", details: "Visualización del avance individual y grupal." },
      ],
    },
     {
      id: "integracion",
      title: "Integración y Despliegue",
      icon: Zap,
      description: "Conexión con otros sistemas y distribución de experiencias.",
      items: [
        { name: "Integración LMS/LXP", details: "Conecta con tu ecosistema de aprendizaje." },
        { name: "Publicación SCORM/xAPI", details: "Estándares para compatibilidad." },
        { name: "Acceso Móvil y Offline", details: "Aprendizaje en cualquier momento y lugar." },
      ],
    },
  ],
};

const LxdPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(lxdContent.tabs[0].id);
  const [activeSection, setActiveSection] = useState(lxdContent.sections[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isFullScreen ? 'bg-slate-200' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100'} text-foreground`}>
      {/* Header Simulado */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
             <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
                <Home size={20}/>
             </Button>
            <div>
                <h1 className="text-lg font-semibold hidden sm:block">{lxdContent.title}</h1>
                <p className="text-xs opacity-80 hidden sm:block">
                    {lxdContent.breadcrumb.join(" > ")}
                </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Input 
                type="search" 
                placeholder="Buscar en LXD..." 
                className="bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 border-0 focus:bg-primary-foreground/30 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70" />
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-grow">
        {/* Barra de Pestañas Secundaria (Simulada) */}
        <div className="bg-background shadow-sm sticky top-[72px] z-30 border-b">
          <div className="container mx-auto">
            <TabsList className="h-12 rounded-none bg-transparent p-0">
              {lxdContent.tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="h-full text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4"
                  >
                    <TabIcon size={16} className="mr-2" /> {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>
      
        <div className="flex-grow container mx-auto py-6 px-4">
          <TabsContent value="inicio" className={`h-full ${activeTab !== 'inicio' ? 'hidden' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:grid md:grid-cols-12 md:gap-6 h-full"
              >
                <aside className="md:col-span-3 bg-card p-4 rounded-lg shadow-lg border border-slate-200 mb-6 md:mb-0 h-fit sticky top-[130px] z-20">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Folder size={20} className="mr-2 text-primary" />
                    Módulos LXD
                  </h2>
                  <ul className="space-y-1">
                    {lxdContent.sections.map((section) => {
                      const SectionIcon = section.icon;
                      return (
                        <li key={section.id}>
                          <Button
                            variant={activeSection === section.id ? 'secondary' : 'ghost'}
                            className={`w-full justify-start items-center text-sm h-auto py-2 px-3 ${activeSection === section.id ? 'font-semibold text-primary' : 'text-foreground hover:text-primary hover:bg-primary/10'}`}
                            onClick={() => setActiveSection(section.id)}
                          >
                            <SectionIcon size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate">{section.title}</span>
                            {activeSection === section.id && <ChevronRight size={16} className="ml-auto" />}
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border">
                      <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/')}>
                          <Home size={16} className="mr-2"/> Regresar al Dashboard General
                      </Button>
                  </div>
                </aside>
                
                <main className="md:col-span-9">
                  {lxdContent.sections.map((section) =>
                    activeSection === section.id ? (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card className="shadow-xl border border-slate-200">
                          <CardHeader className="bg-slate-50 rounded-t-lg border-b border-slate-200">
                             <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                  <section.icon size={24} className="mr-3 text-primary" />
                                  <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                              </div>
                              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                  <ArrowRightLeft size={18} />
                              </Button>
                              </div>
                            <CardDescription className="mt-1">{section.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <Card className="bg-slate-50/50 hover:shadow-md transition-shadow h-full border-slate-200">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-md text-secondary">{item.name}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground">{item.details}</p>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ) : null
                  )}
                </main>
              </motion.div>
          </TabsContent>

          {lxdContent.tabs.filter(t => t.id !== 'inicio').map(tab => (
            <TabsContent key={tab.id} value={tab.id} className={`h-full ${activeTab !== tab.id ? 'hidden' : ''}`}>
              <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Card className="w-full max-w-md text-center p-8 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Contenido en Construcción</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      La sección "{tab.label}" está siendo desarrollada.
                      ¡Vuelve pronto para descubrir nuevas funcionalidades!
                    </p>
                    <Zap size={48} className="mx-auto my-6 text-primary/50" />
                    <Button onClick={() => setActiveTab('inicio')}>Volver a Inicio</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
       <img 
        alt="Abstract geometric background pattern in light blue and gray"
        className="fixed bottom-0 right-0 w-1/2 md:w-1/3 opacity-10 -z-10 pointer-events-none"
         src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
    </div>
  );
};

export default LxdPage;