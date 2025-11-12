import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Layers, UploadCloud, CheckSquare, BarChart3, CalendarDays, ChevronRight, Zap, Folder, Search, UserCircle, Bell, Home, LayoutDashboard, BookOpen, Users, Users2, MoreHorizontal, Package, ListChecks, Tv, Smartphone, MousePointerSquare
} from 'lucide-react';
import Seo from '@/components/Seo';

const initialFeatures = [
  {
    id: "creacion",
    icon: Layers,
    title: "1. Creación de Módulos Inmersivos",
    description: "Para Gestoras RH: Diseñar experiencias VR/AR de forma intuitiva.",
    items: [
      "Wizard “Nuevo Módulo XR” con opciones “Crear VR” / “Crear AR”.",
      "Galería de Plantillas 360° (oficina, planta, laboratorio) con botón “Usar plantilla”.",
      "Editor Drag-and-Drop 3D con paleta de Hotspots (quiz, video 360°, navegación).",
      "Panel de Propiedades: ajustes de duración, umbrales, feedback y modo Sincrónico/Asíncrono."
    ]
  },
  {
    id: "publicacion",
    icon: UploadCloud,
    title: "2. Publicación y Acceso",
    description: "Para Empleados: Acceder fácilmente a las experiencias desde cualquier dispositivo.",
    items: [
      "Magic Links & PWA: enlace único sin login y app progresiva offline.",
      "Visor Integrado: “Ver en tu cámara” (AR) y “Probar en headset” / “Emular en navegador” (VR).",
      "Tutorial Overlay con guía emergente y botón “¿Cómo uso esto?” siempre visible.",
      "Botón “Ayuda XR” con mini-chat asistente o video explicativo."
    ]
  },
  {
    id: "evaluacion",
    icon: CheckSquare,
    title: "3. Evaluación Formativa & Sumativa Inmersiva",
    description: "Integrar la evaluación directamente en la experiencia de aprendizaje.",
    items: [
      "Hotspots de Quiz & Tareas con iconos flotantes y feedback instantáneo.",
      "Encuesta Inmersiva al Finalizar (Likert 1–5) midiendo Familiaridad, Comprensión y Transferencia.",
      "Reglas de Disparo Automático: ej. “Si score < 3 → enviar enlace a módulo de refuerzo”."
    ]
  },
  {
    id: "analitica",
    icon: BarChart3,
    title: "4. Analítica & Reportes",
    description: "Para Gestoras RH: Medir el impacto y la efectividad de los módulos XR.",
    items: [
      "Dashboard XR Analytics: tiempo por hotspot, % aciertos, tasa de finalización, heatmap 3D.",
      "Filtros Sencillos: por equipo, curso, empleado con resultados instantáneos.",
      "Alertas Visuales (semáforos) si engagement < 50% o errores > 30%.",
      "Exportación con un Clic (PDF/PPT) con heatmaps, métricas y resumen ejecutivo."
    ]
  },
  {
    id: "seguimiento",
    icon: CalendarDays,
    title: "5. Seguimiento y “Píldoras de Refuerzo”",
    description: "Asegurar la retención del conocimiento y la aplicación práctica a largo plazo.",
    items: [
      "Scheduler Visual: calendario drag-and-drop para programar encuestas de seguimiento.",
      "Encuestas Post-Curso Integradas: plantillas “Píldora 1” y “Píldora 2” editables.",
      "Alertas de Refuerzo: si transferencia < 40%, sugiere mini-módulo o taller XR extra."
    ]
  }
];

const VrxPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Módulos XR");
  const [selectedFeature, setSelectedFeature] = useState(initialFeatures[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { name: "Inicio", icon: Home },
    { name: "Módulos XR", icon: BookOpen },
    { name: "Comunidad", icon: Users2 },
    { name: "Usuarios", icon: Users },
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
      return <div className="text-center py-10 text-muted-foreground">Selecciona una característica para ver los detalles.</div>;
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
                <ListChecks size={20} className="mr-2 text-primary" /> Funcionalidades Clave:
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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
              Explorar Característica <ChevronRight size={18} className="ml-2"/>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <Seo
        title="VRX"
        description="Experiencias inmersivas de aprendizaje con realidad virtual extendida."
        path="/vrx"
        image="/social/vrx.jpg"
      />
      <div className="min-h-screen flex flex-col bg-slate-100 text-foreground">
        <header className="bg-primary text-primary-foreground p-3 shadow-md sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
                  <Home size={20}/>
              </Button>
              <h1 className="text-lg font-semibold hidden sm:block">VRX</h1>
              <ChevronRight size={20} className="mx-1 opacity-70 hidden sm:block" />
              <span className="text-lg font-semibold">Diseño de Aprendizaje Inmersivo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-48 sm:w-64">
                <Input 
                  type="search" 
                  placeholder="Buscar en VRX..." 
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
                Características VRX
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
                  {activeTab}: {selectedFeature ? selectedFeature.title : "Bienvenido a VRX"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 sm:mb-6">
                Diseña, lanza y mide experiencias VR/AR de forma 100% intuitiva.
              </p>
              {activeTab === "Módulos XR" || activeTab === "Inicio" ? renderContent() : (
                   <div className="text-center py-10 text-muted-foreground">
                      Contenido para la pestaña "{activeTab}" estará disponible pronto.
                      {activeTab === "Inicio" && <Tv className="mx-auto text-primary h-16 w-16 mt-4" />}
                   </div>
              )}
            </main>
          </div>
        </div>
        <img  
          alt="Abstract background illustration for VRX landing page showing virtual reality elements and connections"
          className="fixed bottom-0 left-0 w-1/4 opacity-5 -z-10 pointer-events-none"
         src="https://images.unsplash.com/photo-1593352019705-980934159e3a" />
      </div>
    </>
  );
};

export default VrxPage;