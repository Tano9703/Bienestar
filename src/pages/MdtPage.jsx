import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ClipboardList, Puzzle, Lightbulb, Users, BarChart2, ShieldCheck, ChevronRight, Zap, Folder, Search, UserCircle, Bell, Home, LayoutDashboard, BookOpen, Users2, BarChart3, MoreHorizontal, Package, ListChecks, CheckSquare, FileText, MessageSquare, Video, Brain, SlidersHorizontal
} from 'lucide-react';
import Seo from '@/components/Seo';

const initialFeatures = [
  {
    id: "diagnostico",
    icon: ClipboardList,
    title: "1. Diagnóstico y Evaluación",
    description: "Herramientas para medir conocimientos y competencias.",
    items: [
      "Quiz rápido (opción múltiple, V/F)",
      "Encuesta de autopercepción",
      "Caso práctico con rúbrica",
      "Simulación de escenario"
    ]
  },
  {
    id: "contenido",
    icon: Puzzle,
    title: "2. Contenido Interactivo",
    description: "Formatos para presentar información de manera atractiva.",
    items: [
      "Infografía interactiva (con hotspots)",
      "Video con preguntas embebidas",
      "Línea de tiempo dinámica",
      "Módulo de microlearning (SCORM)"
    ]
  },
  {
    id: "colaboracion",
    icon: Users,
    title: "3. Colaboración y Discusión",
    description: "Actividades para fomentar el aprendizaje social.",
    items: [
      "Foro de debate temático",
      "Lluvia de ideas (Brainstorming)",
      "Trabajo en equipo (con roles)",
      "Peer Review (Revisión por pares)"
    ]
  },
  {
    id: "gamificacion",
    icon: Lightbulb,
    title: "4. Gamificación",
    description: "Elementos de juego para motivar y enganchar.",
    items: [
      "Reto con ranking y puntos",
      "Escape Room digital",
      "Trivia competitiva",
      "Sistema de insignias y logros"
    ]
  },
  {
    id: "reflexion",
    icon: BarChart2,
    title: "5. Reflexión y Feedback",
    description: "Espacios para la introspección y la retroalimentación.",
    items: [
      "Diario de aprendizaje guiado",
      "Encuesta de feedback 360° (simplificada)",
      "Sesión de mentoría virtual",
      "Plan de acción personal"
    ]
  },
  {
    id: "recursos",
    icon: ShieldCheck,
    title: "6. Recursos de Apoyo",
    description: "Materiales complementarios para el aprendizaje.",
    items: [
      "Biblioteca de documentos (PDFs, PPTs)",
      "Glosario de términos clave",
      "FAQs interactivas",
      "Enlaces a herramientas externas"
    ]
  }
];

const MdtPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Actividades");
  const [selectedFeature, setSelectedFeature] = useState(initialFeatures[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { name: "Inicio", icon: Home },
    { name: "Actividades", icon: BookOpen },
    { name: "Plantillas", icon: SlidersHorizontal },
    { name: "Comunidad", icon: Users2 },
    { name: "Resultados", icon: BarChart3 },
    { name: "Más", icon: MoreHorizontal }
  ];

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const filteredFeatures = initialFeatures.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (!selectedFeature) {
      return <div className="text-center py-10 text-muted-foreground">Selecciona una categoría para ver los detalles.</div>;
    }
    const FeatureIcon = selectedFeature.icon || Package;
    return (
      <motion.div
        key={selectedFeature.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0 pb-4 mb-4">
            <div className="flex items-center text-primary">
              <FeatureIcon size={28} className="mr-3 text-primary" />
              <CardTitle className="text-2xl font-bold text-primary">{selectedFeature.title}</CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground mt-1 italic">{selectedFeature.description}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <ListChecks size={20} className="mr-2 text-primary" /> Tipos de Actividades:
              </h4>
              <ul className="space-y-2 pl-1">
                {selectedFeature.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Zap size={18} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="bg-primary hover:opacity-90 text-primary-foreground mt-4">
              Explorar Categoría <ChevronRight size={18} className="ml-2"/>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <Seo
        title="MDT"
        description="Modelo de Desarrollo de Talento: estructura integral para el crecimiento de las personas."
        path="/mdt"
        image="/social/mdt.jpg"
      />
      <div className="min-h-screen flex flex-col bg-slate-100 text-foreground">
        <header className="bg-primary text-primary-foreground p-3 shadow-md sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
                  <Home size={20}/>
              </Button>
              <h1 className="text-lg font-semibold hidden sm:block">LCMS</h1>
              <ChevronRight size={20} className="mx-1 opacity-70 hidden sm:block" />
              <span className="text-lg font-semibold">Caja de Herramientas para Actividades Interactivas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-48 sm:w-64">
                <Input 
                  type="search" 
                  placeholder="Buscar actividades..." 
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
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                return (
                  <Button 
                    key={tab.name} 
                    variant="ghost" 
                    onClick={() => setActiveTab(tab.name)}
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm rounded-none font-medium h-auto flex items-center
                      ${activeTab === tab.name 
                        ? 'text-primary-foreground bg-primary/80 border-b-2 border-primary-foreground' 
                        : 'text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-primary/60'
                      }`}
                  >
                    <TabIcon size={16} className="mr-0 sm:mr-2" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="flex-grow container mx-auto py-4 sm:py-6 px-2 sm:px-4">
          <div className="md:grid md:grid-cols-12 md:gap-4 sm:gap-6 h-full">
            <aside className="md:col-span-3 bg-card p-3 sm:p-4 rounded-lg shadow-md border-border mb-4 md:mb-0 h-fit sticky top-[112px] z-20">
              <h2 className="text-md sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
                <Folder size={18} className="mr-2 text-primary" />
                Categorías de Actividades
              </h2>
              <nav className="space-y-1">
                {filteredFeatures.map((feature) => {
                  const FeatureIcon = feature.icon || Package;
                  return (
                    <Button
                      key={feature.id}
                      variant={selectedFeature?.id === feature.id ? "default" : "ghost"}
                      className={`w-full justify-start items-center text-xs sm:text-sm h-auto py-1.5 px-2
                        ${selectedFeature?.id === feature.id 
                          ? 'bg-primary text-primary-foreground font-semibold' 
                          : 'text-foreground hover:text-primary hover:bg-primary/10'
                        }`}
                      onClick={() => handleFeatureSelect(feature)}
                    >
                      <FeatureIcon size={16} className={`mr-2 flex-shrink-0 ${selectedFeature?.id === feature.id ? '' : 'text-primary'}`} />
                      <span className="truncate">{feature.title}</span>
                      {selectedFeature?.id === feature.id && <ChevronRight size={14} className="ml-auto" />}
                    </Button>
                  );
                })}
              </nav>
              <div className="mt-6 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/')}>
                      <LayoutDashboard size={16} className="mr-2"/> Regresar al dashboard general
                  </Button>
              </div>
            </aside>

            <main className="md:col-span-9 bg-card p-3 sm:p-6 rounded-lg shadow-md border-border">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {activeTab}: {selectedFeature ? selectedFeature.title : "Bienvenido"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
                Explora y utiliza diversas actividades interactivas para tus formaciones.
              </p>
              {activeTab === "Actividades" || activeTab === "Inicio" ? renderContent() : (
                   <div className="text-center py-10 text-muted-foreground">
                      Contenido para la pestaña "{activeTab}" estará disponible pronto.
                      {activeTab === "Inicio" && <Puzzle className="mx-auto text-primary h-16 w-16 mt-4" />}
                   </div>
              )}
            </main>
          </div>
        </div>
        <img  
          alt="Abstract background illustration for interactive activities toolbox"
          className="fixed bottom-0 right-0 w-1/3 opacity-5 -z-10 pointer-events-none"
         src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" />
      </div>
    </>
  );
};

export default MdtPage;