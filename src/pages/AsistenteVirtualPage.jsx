import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Brain, Zap, Link2, Clock, BarChartHorizontalBig, ChevronRight, Folder, Search, UserCircle, Bell, Home, LayoutDashboard, MessageSquare, Settings, Activity, Smile, Meh, Frown, Mic, CalendarDays, Lightbulb, TrendingUp, BookOpen, Star, Briefcase
} from 'lucide-react';

const assistantFeatures = [
  {
    id: "coaching-hibrido",
    icon: Brain,
    title: "Coaching híbrido IA+humano",
    description: "Plataformas como Chronus combinan comunidades de mentoría con IA para escalar el acompañamiento y vincularlo a objetivos de negocio. BetterUp integra IA y coaches humanos para entregar recomendaciones contextuales y refuerzo de comportamientos clave. Nadia de Valence actúa como un “confidencial sounding board”, ofreciendo soporte privado y seguro.",
    items: [
      "Chronus: Comunidades de mentoría + IA para escalar acompañamiento.",
      "BetterUp: IA + coaches humanos para recomendaciones y refuerzo.",
      "Nadia de Valence: Soporte privado y seguro como “confidencial sounding board”."
    ]
  },
  {
    id: "integracion-flujo",
    icon: Link2,
    title: "Integración en el flujo de trabajo",
    description: "EdCast GuideMe inserta sugerencias de contenido y tutoriales contextuales directamente dentro de las aplicaciones corporativas. BetterUp Grow planifica integraciones con Teams y Slack para proporcionar coaching sin salir de las herramientas de trabajo. IBM Watson Career Coach se integra con sistemas de conversación y flujos de RRHH para ofrecer guía de carrera en el mismo lugar de trabajo.",
    items: [
      "EdCast GuideMe: Sugerencias y tutoriales contextuales en apps corporativas.",
      "BetterUp Grow: Integraciones con Teams y Slack para coaching en herramientas de trabajo.",
      "IBM Watson Career Coach: Guía de carrera integrada en sistemas de conversación y RRHH."
    ]
  },
  {
    id: "disponibilidad-confidencialidad",
    icon: Clock,
    title: "Disponibilidad 24/7 y confidencialidad",
    description: "CoachHub Aimy ofrece coaching 24/7, asegurando acceso permanente a acompañamiento personalizado. Nadia de Valence garantiza una experiencia anónima y confidencial, fomentando la honestidad en la interacción. Mindset AI permite crear agentes AI embebidos que están disponibles constantemente y respetan la privacidad del usuario.",
    items: [
      "CoachHub Aimy: Coaching 24/7 para acceso permanente.",
      "Nadia de Valence: Experiencia anónima y confidencial.",
      "Mindset AI: Agentes AI embebidos disponibles constantemente con privacidad."
    ]
  },
  {
    id: "analitica-desarrollo",
    icon: BarChartHorizontalBig,
    title: "Analítica de desarrollo",
    description: "Chronus proporciona dashboards en tiempo real para medir la evolución de las relaciones de mentoría y la participación. BetterUp AI Coaching genera “talent intelligence” y métricas de impacto organizacional que vinculan el coaching a resultados de negocio. IBM Watson Career Coach identifica brechas de habilidades y mapea trayectorias profesionales basadas en datos de desempeño.",
    items: [
      "Chronus: Dashboards en tiempo real para mentoría y participación.",
      "BetterUp AI Coaching: “Talent intelligence” y métricas de impacto organizacional.",
      "IBM Watson Career Coach: Identificación de brechas de habilidades y mapeo de trayectorias."
    ]
  },
  {
    id: "match-microsessions",
    icon: Zap,
    title: "Match & micro-sessions",
    description: "Qooper utiliza algoritmos inteligentes para emparejar mentores y mentees, permitiendo formatos de self-match y auto-match eficientes. CoachHub Aimy sugiere micro-learnings y sesiones breves de coaching para reforzar aprendizajes de forma ágil.",
    items: [
      "Qooper: Algoritmos para emparejamiento eficiente de mentores y mentees.",
      "CoachHub Aimy: Sugerencias de micro-learnings y sesiones breves de coaching."
    ]
  }
];

const moodIcons = [
  { id: 'happy', icon: Smile, color: 'text-green-500' },
  { id: 'neutral', icon: Meh, color: 'text-yellow-500' },
  { id: 'sad', icon: Frown, color: 'text-red-500' },
];

const AsistenteVirtualPage = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState(null);
  const [careerGoal, setCareerGoal] = useState("");
  const [showResourcesModal, setShowResourcesModal] = useState(false);

  const handleMoodSelect = (moodId) => {
    setCurrentMood(moodId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 text-foreground p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2 text-primary hover:bg-primary/10" onClick={() => navigate('/')}>
                    <Home size={24}/>
                </Button>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Asistente Virtual de Desarrollo del Potencial</h1>
                    <p className="text-sm sm:text-md text-muted-foreground">Claves para potenciar el talento: IA+humano, integración, disponibilidad, analítica y micro-sessions</p>
                </div>
            </div>
             <Button variant="outline" className="text-sm hidden md:flex items-center" onClick={() => navigate('/')}>
                <LayoutDashboard size={16} className="mr-2"/> Dashboard General
            </Button>
        </div>
      </header>

      <main className="container mx-auto flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Principal del Asistente */}
          <motion.div 
            className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-primary mb-6">Desarrollo de Talento</h2>
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <UserCircle size={80} className="text-primary" />
              </div>
              <p className="text-3xl font-semibold text-secondary mb-2">¡Hola!</p>
              <p className="text-muted-foreground text-lg">¿Cómo puedo ayudarte hoy?</p>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
              {moodIcons.map(mood => {
                const MoodIconComponent = mood.icon;
                return (
                  <Button 
                    key={mood.id} 
                    variant={currentMood === mood.id ? "default" : "outline"} 
                    size="icon" 
                    className={`rounded-full w-14 h-14 ${currentMood === mood.id ? 'bg-primary text-primary-foreground' : mood.color + ' border-current hover:bg-primary/10'}`}
                    onClick={() => handleMoodSelect(mood.id)}
                  >
                    <MoodIconComponent size={30} />
                  </Button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button 
                variant="outline" 
                className="py-6 text-md bg-primary/5 hover:bg-primary/10 border-primary/30 text-primary font-semibold flex items-center justify-center space-x-2"
              >
                <Star size={20} />
                <span>Diario de Ánimo</span>
              </Button>
              <Button 
                variant="outline" 
                className="py-6 text-md bg-primary/5 hover:bg-primary/10 border-primary/30 text-primary font-semibold flex items-center justify-center space-x-2"
                onClick={() => setShowResourcesModal(true)}
              >
                <BookOpen size={20} />
                <span>Recursos de Aprendizaje</span>
              </Button>
            </div>
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Define tus objetivos de carrera..." 
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="py-6 pl-4 pr-12 text-md border-2 border-primary/30 focus:border-primary focus:ring-primary"
              />
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10">
                <Mic size={24} />
              </Button>
            </div>
          </motion.div>

          {/* Columna Lateral de Información */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-slate-200">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lightbulb size={24} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">Tips de Coaching</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Practica la escucha activa en tus conversaciones para mejorar la comprensión y conexión.</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-slate-200">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                 <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp size={24} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">Tendencia de Bienestar</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                 <div className="w-full h-20 bg-slate-200 rounded-md flex items-center justify-center">
                    <BarChartHorizontalBig size={30} className="text-primary/50" />
                 </div>
                <p className="text-xs text-muted-foreground mt-2">Visualiza tu progreso en bienestar.</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-slate-200">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarDays size={24} className="text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">Próximas Sesiones</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Mentoría con Ana Pérez</p>
                <p className="text-sm text-foreground font-semibold">Hoy, 2:00 PM</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      {/* Modal para Recursos de Aprendizaje */}
      {showResourcesModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-card p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-primary flex items-center"><BookOpen size={24} className="mr-2"/>Recursos de Aprendizaje</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowResourcesModal(false)}>
                <ChevronRight size={24} className="transform rotate-45"/>
              </Button>
            </div>
            <div className="space-y-4">
              {assistantFeatures.map(feature => {
                const FeatureIcon = feature.icon || Briefcase;
                return (
                  <Card key={feature.id} className="bg-slate-50 border-slate-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-md text-primary flex items-center">
                        <FeatureIcon size={20} className="mr-2" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        {feature.items.map((item, index) => (
                          <li key={index} className="text-xs text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
      <img 
        alt="Decorative background element in soft blue tones, abstract wave pattern"
        className="fixed bottom-0 right-0 md:w-1/3 opacity-20 -z-10 pointer-events-none transform scale-x-[-1]"
         src="https://images.unsplash.com/photo-1693349215728-a07e968ae462" />
    </div>
  );
};

export default AsistenteVirtualPage;