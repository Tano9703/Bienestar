import { Ship, Users, Trophy, Lightbulb, Rocket, Settings, MessageSquare, BarChart3, ShieldCheck, Link2, BookUser } from 'lucide-react';

const today = new Date();
const getFutureDate = (days) => {
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  return futureDate.toISOString().split('T')[0];
};

export const phasesData = [
  {
    phaseNumber: "0",
    title: "Pre-embarque",
    week: "Semana –1",
    objective: "Generar expectativa y asignar al tripulante su “barco” (proyecto) y mentor (capitán).",
    icon: Rocket,
    details: [
      { id: "bienvenida", title: "Bienvenida Narrativa", description: "Vídeo de inmersión: historia de la “flota” y misión corporativa. Quiz de ambientación: conceptos clave de proyectos activos." },
      { id: "asignacion", title: "Asignación de Tripulación", description: "“Magic Link” que revela el nombre de tu barco y tu capitán. Mini-encuesta sobre tus fortalezas (Jobs–Pains–Gains)." },
      { id: "premio", title: "Premio de Inicio", description: "Badge digital “Recluta XR” al completar el pre-embarque." },
    ],
  },
  {
    phaseNumber: "1",
    title: "Preparación y Autonomía",
    week: "Semana 1",
    objective: "Auto-aprendizaje guiado de herramientas y procesos del proyecto.",
    icon: Ship,
    details: [
      { 
        id: "manual", 
        title: "Misión “Manual del Mar”", 
        description: "Micro-módulos LXD (videos, lecturas, simulaciones). Autoevaluación de competencias con rutas personalizadas.",
        challenges: [
          { id: 'reto1', title: 'Fundamentos de Navegación', icon: 'Compass', status: 'completed', assignedDate: getFutureDate(0), deadline: getFutureDate(2), comments: 'Revisión de cartografía básica completada.' },
          { id: 'reto2', title: 'Herramientas del Astillero', icon: 'Wrench', status: 'completed', assignedDate: getFutureDate(1), deadline: getFutureDate(4), comments: 'Certificación en herramientas de desarrollo obtenida.' },
          { id: 'reto3', title: 'Protocolos de Comunicación', icon: 'Radio', status: 'available', assignedDate: getFutureDate(2), deadline: getFutureDate(5), comments: '' },
          { id: 'reto4', title: 'Seguridad a Bordo', icon: 'LifeBuoy', status: 'available', assignedDate: getFutureDate(3), deadline: getFutureDate(6), comments: '' },
          { id: 'reto5', title: 'Cultura del Proyecto', icon: 'BookOpen', status: 'locked', assignedDate: '', deadline: '', comments: '' },
          { id: 'reto6', title: 'Simulación de Tareas', icon: 'Bot', status: 'locked', assignedDate: '', deadline: '', comments: '' },
        ]
      },
      { id: "gamificacion", title: "Gamificación", description: "Sistema de puntos por actividad completada. Progress bar de nivel (0→25 %) para desbloquear la siguiente misión." },
    ],
  },
  {
    phaseNumber: "2",
    title: "Entrenamiento en Equipo",
    week: "Semana 2",
    objective: "Trabajo colaborativo bajo la guía del capitán y la comunidad de práctica.",
    icon: Users,
    details: [
      { id: "aventura", title: "Módulo “Aventura ABC”", description: "Un viaje interactivo (Arena Blended Connected) donde los participantes eligen su ruta a través de la adquisición de conocimientos, indagación, colaboración, práctica, discusión y producción de informes." },
      { id: "mecanicas", title: "Muro del Equipo", description: "Comparte ideas, haz preguntas y colabora con tu tripulación en tiempo real." },
    ],
  },
  {
    phaseNumber: "3",
    title: "Misión a Bordo",
    week: "Semanas 3–4",
    objective: "Asumir tareas reales del proyecto como “tripulante activo”.",
    icon: ShieldCheck,
    details: [
      { id: "tareas", title: "Asignación de Tareas", description: "Checklist digital de actividades, con Deadlines y responsables. Hotspots interactivos en plataforma (quiz y micro-tareas “in situ”)." },
      { id: "soporte", title: "Soporte y Tutoría", description: "Chat bot “Primer Oficial” para resolver dudas 24/7. Sesiones one-to-one con el capitán para feedback formativo." },
    ],
  },
   {
    phaseNumber: "4",
    title: "Compartir Realidad y Feedback",
    week: "Fin Mes 1",
    objective: "Reflexionar sobre la experiencia, recoger aprendizajes y ajustar rumbo.",
    icon: MessageSquare,
    details: [
      { id: "feedback", title: "Centro de Mando de Feedback", description: "Un espacio centralizado para programar sesiones, comunicarse y monitorear el progreso de la mentoría." },
      { id: "reglamento", title: "Consulta de Reglamento Interno", description: "Accede a las FAQs y al chat de normativas para resolver cualquier duda sobre las políticas de la empresa.", icon: BookUser },
    ],
  },
  {
    phaseNumber: "5",
    title: "Acción e Innovación",
    week: "Mes 2",
    objective: "Proponer mejoras y aplicar aprendizajes en el proyecto.",
    icon: Lightbulb,
    details: [
      { 
        id: "innovacion", 
        title: "Laboratorio de Ideas y Votación", 
        description: "Un espacio colaborativo para proponer, votar y priorizar ideas innovadoras que impulsen el proyecto. ¡Tu próxima gran idea empieza aquí!" 
      },
    ],
  },
  {
    phaseNumber: "6",
    title: "Consolidación y Prospección",
    week: "Mes 3",
    objective: "Medir impacto, celebrar logros y planear siguientes misiones.",
    icon: Trophy,
    details: [
      { id: "consolidado", title: "Consolidado Trimestral", description: "Reporte automático: objetivos alcanzados (OKR), KPIs de aprendizaje y clima. Comparativo T1 vs. T2 vs. T3 en dashboard." },
      { id: "ceremonia", title: "Ceremonia de Grados", description: "Evento virtual/presencial con entrega de diplomas digitales. Reconocimiento público de tripulaciones destacadas." },
      { id: "roadmap", title: "Roadmap de Siguientes Viajes", description: "Plan de desarrollo individual y de equipo para el próximo trimestre. Badge “Veterano de Tripulación” y desbloqueo de módulos avanzados." },
    ],
  }
];

export const recommendationsData = [
  { title: "Portal de Tripulaciones", description: "Dashboard personalizado por barco (proyecto) y rol. Acceso vía SSO y Magic Links para invitados especiales (SMEs).", icon: Ship },
  { title: "Integración con HRIS y HCM", description: "Importación automática de perfiles para asignación de tripulaciones. Envío de notificaciones y reportes al área de Talento Humano.", icon: Link2 },
  { title: "Gamificación Sólida", description: "Puntos, niveles y badges gestionados por motor de reglas. Leaderboards públicos por barco y global.", icon: Trophy },
  { title: "Soporte Multicanal", description: "Chat bot para dudas operativas y pedagógicas. Notificaciones push, email y Slack/Teams para eventos clave.", icon: MessageSquare },
  { title: "Analítica y Mejora Continua", description: "Métricas de engagement, progreso y efectividad de misiones. Ciclos de feedback trimestrales para ajustar contenido y dinámica.", icon: BarChart3 },
];