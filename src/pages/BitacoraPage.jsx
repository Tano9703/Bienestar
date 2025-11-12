import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Smile, Edit3, BookOpen, Target, BarChartHorizontal, Bell, Lock, Home, FileText, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BitacoraSidebar } from '@/components/bitacora/BitacoraSidebar';
import { BitacoraContent } from '@/components/bitacora/BitacoraContent';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";
import Seo from '@/components/Seo';

const sectionsData = [
  {
    id: "mood",
    title: "Registro de Ánimo",
    icon: Smile,
    description: "Captura y visualiza tu estado de ánimo diario.",
    content: {
      type: "moodTracker",
      selectorPrompt: "¿Cómo te sientes hoy?",
      logPrompt: "¿Qué tienes en mente hoy?",
      trendOptions: ["Últimos 7 días", "Últimos 14 días", "Últimos 30 días"],
      tags: ["Trabajo", "Personal", "Salud"],
    }
  },
  {
    id: "reflection",
    title: "Entradas de Reflexión",
    icon: BookOpen,
    description: "Profundiza con plantillas de journaling y feedback.",
    content: {
      type: "journal",
    }
  },
  {
    id: "goals",
    title: "Objetivos de Bienestar",
    icon: Target,
    description: "Define y sigue tus metas personales de bienestar.",
    content: {
      type: "goalTracker",
      goalTypes: ["SMART Semanal", "SMART Mensual"],
      features: ["Copiar meta anterior", "Barra de progreso visual", "Alertas de cumplimiento"],
    }
  },
  {
    id: "insights",
    title: "Insights y Recomendaciones",
    icon: BarChartHorizontal,
    description: "Obtén una visión clara de tu bienestar y consejos.",
    content: {
      type: "dashboard",
      widgets: ["Promedio de ánimo", "Metas activas", "Streaks de journaling", "Score de Bienestar (0-100)"],
      recommendations: ["Contenido multimedia", "Ejercicios personalizados", "Rutinas breves (Chatbot Coach)"],
    }
  },
  {
    id: "integrations",
    title: "Integraciones y Notificaciones",
    icon: Bell,
    description: "Conecta con otras apps y recibe recordatorios útiles.",
    content: {
      type: "settingsList",
      notifications: ["Recordatorio diario de ánimo", "Recordatorio de journaling", "Alerta de ánimo bajo"],
      integrations: ["Fitbit (sueño y actividad)", "Google Fit (sueño y actividad)"],
    }
  },
  {
    id: "privacy",
    title: "Privacidad y Seguridad",
    icon: Lock,
    description: "Tus datos están seguros y bajo tu control.",
    content: {
      type: "settingsList",
      privacyOptions: ["Modo anónimo (cifrado de entradas)", "Exportar bitácora (PDF cifrado)", "Protección con contraseña para exportar"],
    }
  }
];

const BitacoraPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(sectionsData[0]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isMentorAlertOpen, setIsMentorAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleSetSelectedSectionById = (id) => {
    const section = sectionsData.find(s => s.id === id);
    if (section) {
      setSelectedSection(section);
    }
  };

  const handleEntrySubmit = (mood, tags) => {
    console.log(`Entry submitted with mood: ${mood} and tags: ${tags.join(', ')}`);
    if (mood === 1) {
      setIsMentorAlertOpen(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleGoalCreation = (createGoal) => {
    setIsAlertOpen(false);
    if (createGoal) {
      handleSetSelectedSectionById("goals");
      toast({
        title: "¡Objetivo Creado!",
        description: "Tu entrada se ha convertido en un nuevo objetivo de bienestar.",
      });
    } else {
      handleSetSelectedSectionById("integrations");
      toast({
        title: "Registro Guardado",
        description: "Tu entrada ha sido guardada. Revisa tus notificaciones.",
      });
    }
  };
  
  const handleGoToMentors = () => {
    setIsMentorAlertOpen(false);
    navigate('/red-de-mentores');
  };

  const contentBgColor = "bg-background";

  return (
    <>
      <Seo
        title="Mi Bitácora"
        description="Registra, sigue y reflexiona sobre tu aprendizaje y objetivos."
        path="/bitacora"
        noIndex
        image="/social/bitacora.jpg"
      />
      <div className={`min-h-screen flex flex-col font-sans`}>
        <header className={`bg-primary text-primary-foreground p-4 shadow-md`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Edit3 size={28} className="mr-3" />
              <h1 className="text-xl font-bold">Mi Bitácora de Bienestar</h1>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs"
              size="sm"
            >
              <Home size={16} className="mr-1.5" />
              Inicio
            </Button>
          </div>
        </header>

        <nav className={`bg-secondary text-secondary-foreground shadow`}>
          <div className="container mx-auto px-4">
            <div className="flex space-x-1">
              {["General", "Mi Progreso", "Recursos", "Configuración"].map(tab => (
                <Button key={tab} variant="ghost" className={`text-secondary-foreground hover:bg-primary/80 rounded-none data-[state=active]:bg-primary/80 data-[state=active]:font-semibold`}>
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex-grow container mx-auto py-6 px-4">
          <div className="md:grid md:grid-cols-12 md:gap-6 h-full">
            <BitacoraSidebar 
              sections={sectionsData}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
            />

            <main className={`md:col-span-9 ${contentBgColor} p-6 rounded-lg shadow-md border border-border`}>
              <AnimatePresence mode="wait">
                {selectedSection ? (
                  <BitacoraContent section={selectedSection} onEntrySubmit={handleEntrySubmit} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <FileText size={48} className="text-primary mb-4" />
                    <h2 className="text-xl font-semibold text-foreground">Bienvenido a tu Bitácora</h2>
                    <p className="text-muted-foreground mt-2">Selecciona una sección de la izquierda para comenzar.</p>
                  </div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Convertir en Objetivo?</AlertDialogTitle>
              <AlertDialogDescription>
                Has guardado esta entrada. ¿Te gustaría convertirla en un nuevo "Objetivo de Bienestar" para darle seguimiento?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleGoalCreation(false)}>No, solo guardar</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleGoalCreation(true)}>Sí, crear objetivo</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Dialog open={isMentorAlertOpen} onOpenChange={setIsMentorAlertOpen}>
          <DialogContent>
            <DialogHeader>
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl pt-4">¿Necesitas hablar con alguien?</DialogTitle>
              <DialogDescription className="text-center">
                Notamos que quizás no estás teniendo tu mejor día. A veces, hablar con alguien puede ayudar. ¿Te gustaría conectar con un mentor?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center pt-4">
              <DialogClose asChild>
                  <Button type="button" variant="ghost">Ahora no</Button>
              </DialogClose>
              <Button type="button" onClick={handleGoToMentors}>
                Ver Mentores
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BitacoraPage;