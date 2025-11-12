import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCircle, Briefcase, Star, TrendingUp, BookOpen, Heart, Users2, BarChart3, Home, Search, Bell, ChevronRight, Settings, Edit3, MessageSquare, MapPin, Phone, Mail, Building, ArrowRightLeft, CalendarDays, CheckCircle, Award, Target, ListChecks, Users, Maximize, Minimize, Folder, ExternalLink
} from 'lucide-react';

const profileData = {
  demographics: {
    title: "Datos Demográficos y Organizacionales",
    icon: UserCircle,
    content: [
      { label: "Nombre", value: "Ana García (Ejemplo)", icon: UserCircle },
      { label: "Cargo", value: "Especialista en Desarrollo de Talento", icon: Briefcase },
      { label: "Departamento", value: "Recursos Humanos", icon: Building },
      { label: "Ubicación", value: "Oficina Central, Ciudad X", icon: MapPin },
      { label: "Email", value: "ana.garcia@example.com", icon: Mail },
      { label: "Teléfono", value: "000-123-4567", icon: Phone },
      { label: "ID Empleado", value: "EMP-007", icon: UserCircle },
      { label: "Tipo Contrato", value: "Indefinido", icon: Briefcase },
      { label: "Fecha Ingreso", value: "2022-08-15", icon: CalendarDays },
    ]
  },
  skills: {
    title: "Habilidades y Competencias",
    icon: Star,
    content: [
      { category: "Taxonomía de Habilidades", items: ["Diseño Instruccional (L4, 2024-05-10)", "Gestión de Proyectos (L3, 2024-04-20)", "Análisis de Datos (L2, 2024-03-01)"] },
      { category: "Endosos y Validaciones", items: ["Recomendación de Juan Pérez (Manager)", "Assessment de Liderazgo: Alto Potencial"] },
    ]
  },
  experience: {
    title: "Experiencia Laboral y Proyectos",
    icon: Briefcase,
    content: [
      { role: "Coordinadora de Formación", project: "Implementación LMS", description: "Lideré la adopción del nuevo LMS, incrementando uso en 30%.", duration: "2023-2024" },
      { role: "Analista de Contenido", project: "Rediseño Malla Curricular", description: "Participé en el rediseño de 5 programas clave.", duration: "2022-2023" },
    ]
  },
  performance: {
    title: "Desempeño y Objetivos",
    icon: TrendingUp,
    content: [
      { label: "Evaluación 2023", value: "Sobresaliente (4.8/5)", comment: "Excedió expectativas en liderazgo de proyectos." },
      { label: "OKR Q2 2024", value: "Desarrollar 2 nuevos micro-cursos (75% completado)", targetDate: "2024-06-30" },
    ]
  },
  learning: {
    title: "Aprendizaje y Desarrollo",
    icon: BookOpen,
    content: [
      { course: "Certificación en Agile Project Management", provider: "Coursera", date: "2024-01-15" },
      { course: "Microcredential: IA en RRHH", provider: "LinkedIn Learning", date: "2023-11-20" },
      { path: "Ruta Sugerida: Liderazgo Estratégico (basado en autoevaluación)" },
    ]
  },
  engagement: {
    title: "Compromiso y Bienestar",
    icon: Heart,
    content: [
      { metric: "Survey 360° Q1 2024", result: "Engagement Alto (85%)" },
      { metric: "Mood Tracking (Promedio Últimos 30 días)", result: "Positivo 👍" },
    ]
  },
  connections: {
    title: "Conexiones y Redes Internas",
    icon: Users2,
    content: [
      { type: "Mentores Sugeridos", items: ["Carlos López (SME en IA)", "Laura Torres (Experta en Gamificación)"] },
      { type: "Comunidades", items: ["Foro de Innovación en RRHH", "Cohort Aprendizaje Continuo"] },
    ]
  },
  analytics: {
    title: "Analítica y Accionabilidad",
    icon: BarChart3,
    content: [
      { dashboard: "Dashboard Personalizado", description: "Vista agregada de skills, desempeño y engagement con alertas." },
      { integration: "Asistente IA (Galileo Learn™)", description: "Sugerencias de desarrollo en flujo de trabajo." },
    ]
  }
};

const sectionKeys = Object.keys(profileData);

const MiPerfilPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(sectionKeys[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const renderSectionContent = (sectionKey) => {
    const section = profileData[sectionKey];
    const SectionIcon = section.icon || Folder;

    if (sectionKey === "demographics") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.content.map((item, idx) => {
            const ItemIcon = item.icon || CheckCircle;
            return (
              <Card key={idx} className="bg-slate-50/50 border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs flex items-center text-muted-foreground">
                    <ItemIcon size={14} className="mr-2 text-primary" />{item.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }

    if (sectionKey === "skills" || sectionKey === "connections") {
      return (
         <div className="space-y-4">
            {section.content.map((cat, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-md mb-1 text-primary">{cat.category || cat.type}</h4>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
         </div>
      );
    }

    if (sectionKey === "experience") {
      return (
        <div className="space-y-4">
          {section.content.map((exp, idx) => (
            <Card key={idx} className="bg-slate-50/50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{exp.role} - {exp.project}</CardTitle>
                <CardDescription className="text-xs">{exp.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    if (sectionKey === "performance" || sectionKey === "engagement") {
      return (
        <div className="space-y-3">
          {section.content.map((item, idx) => (
            <div key={idx} className="p-3 border rounded-md bg-slate-50/50 border-slate-200">
              <p className="text-sm font-semibold text-primary">{item.label || item.metric}</p>
              <p className="text-sm text-muted-foreground">{item.value || item.result}</p>
              {item.comment && <p className="text-xs italic text-muted-foreground mt-1">"{item.comment}"</p>}
              {item.targetDate && <p className="text-xs text-muted-foreground mt-1">Fecha Límite: {item.targetDate}</p>}
            </div>
          ))}
        </div>
      );
    }

    if (sectionKey === "learning") {
       return (
        <div className="space-y-3">
          {section.content.map((item, idx) => (
            <div key={idx} className="p-3 border rounded-md bg-slate-50/50 border-slate-200">
              {item.course && <p className="text-sm font-semibold text-primary">{item.course}</p>}
              {item.provider && <p className="text-xs text-muted-foreground">Proveedor: {item.provider}</p>}
              {item.date && <p className="text-xs text-muted-foreground">Fecha: {item.date}</p>}
              {item.path && <p className="text-sm font-semibold text-primary mt-1">{item.path}</p>}
            </div>
          ))}
        </div>
      );
    }

    if (sectionKey === "analytics") {
       return (
        <div className="space-y-3">
          {section.content.map((item, idx) => (
            <div key={idx} className="p-3 border rounded-md bg-slate-50/50 border-slate-200">
              <p className="text-sm font-semibold text-primary">{item.dashboard || item.integration}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-muted-foreground">Contenido no disponible para esta sección.</p>;
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 text-foreground">
      {/* Header Simulado */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
             <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
                <Home size={20}/>
             </Button>
            <Avatar className="h-8 w-8 mr-3 border-2 border-primary-foreground/50">
              <AvatarImage src="https://i.pravatar.cc/150?u=ana-garcia" alt="Ana García" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-lg font-semibold hidden sm:block">Mi Perfil</h1>
                <p className="text-xs opacity-80 hidden sm:block">Ana García (Ejemplo)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <Input 
                type="search" 
                placeholder="Buscar en perfil..." 
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
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Navegación de Pestañas Principal (Simulada) */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-grow container mx-auto py-6 px-4">
        <div className="md:grid md:grid-cols-12 md:gap-6 h-full">
          <aside className="md:col-span-3 bg-card p-4 rounded-lg shadow-lg border border-slate-200 mb-6 md:mb-0 h-fit sticky top-[88px] z-20">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Folder size={20} className="mr-2 text-primary" />
              Secciones del Perfil
            </h2>
            <TabsList className="flex flex-col items-stretch h-auto bg-transparent p-0 space-y-1">
              {sectionKeys.map((key) => {
                const section = profileData[key];
                const SectionIcon = section.icon || Folder;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={`w-full justify-start items-center text-sm h-auto py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=inactive]:text-foreground data-[state=inactive]:hover:text-primary data-[state=inactive]:hover:bg-primary/10 rounded-md`}
                  >
                    <SectionIcon size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{section.title}</span>
                    {activeTab === key && <ChevronRight size={16} className="ml-auto" />}
                  </TabsTrigger>
                );
              })}
            </TabsList>
             <div className="mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/')}>
                    <Home size={16} className="mr-2"/> Regresar al Dashboard
                </Button>
            </div>
          </aside>
          
          <main className="md:col-span-9">
            {sectionKeys.map((key) => {
              const section = profileData[key];
              const SectionIcon = section.icon || Folder;
              return (
                <TabsContent key={key} value={key} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="shadow-xl border border-slate-200">
                      <CardHeader className="bg-slate-50 rounded-t-lg border-b border-slate-200">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <SectionIcon size={24} className="mr-3 text-primary" />
                            <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Edit3 size={18} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        {renderSectionContent(key)}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </main>
        </div>
      </Tabs>
       <img 
        alt="Abstract geometric background pattern in light blue and gray"
        className="fixed bottom-0 left-0 w-1/2 md:w-1/4 opacity-10 -z-10 pointer-events-none"
         src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
    </div>
  );
};

export default MiPerfilPage;