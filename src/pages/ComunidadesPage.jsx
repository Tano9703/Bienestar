import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, ThumbsUp, Tag, CalendarDays, Bell, ShieldCheck, Award, Search, 
  Home, PlusCircle, Image as ImageIcon, Video, Paperclip, Smile, Send, MoreHorizontal,
  ChevronLeft, ChevronRight, Star, Settings, Filter, Users2, Edit, Eye, Activity, PieChart, ListChecks, UserCircle, ThumbsUp as ThumbsUpIcon, MessageCircle as MessageCircleIcon, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/Seo';

const PostCard = ({ userName, userAvatar, timeAgo, content, imageUrl, likes, comments, shares }) => (
  <motion.div 
    className="bg-card p-4 sm:p-6 rounded-xl shadow-lg border mb-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center mb-4">
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={userAvatar} alt={userName} />
        <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-card-foreground">{userName}</p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground hover:text-foreground">
        <MoreHorizontal size={20} />
      </Button>
    </div>
    <p className="text-foreground mb-4 whitespace-pre-wrap">{content}</p>
    {imageUrl && (
      <div className="mb-4 rounded-lg overflow-hidden">
        <img-replace src={imageUrl} alt="Post image" className="w-full h-auto object-cover" />
      </div>
    )}
    <div className="flex justify-between items-center text-muted-foreground">
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary">
          <ThumbsUpIcon size={18} className="mr-1" /> {likes} Me gusta
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary">
          <MessageCircleIcon size={18} className="mr-1" /> {comments} Comentarios
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground hover:text-primary">
          <Share2 size={18} className="mr-1" /> {shares} Compartir
        </Button>
      </div>
    </div>
  </motion.div>
);

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 30)); 

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); 

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth(year, month);
    let firstDay = firstDayOfMonth(year, month);
    firstDay = firstDay === 0 ? 6 : firstDay -1; 

    const blanks = Array(firstDay).fill(null);
    const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);
    
    const today = new Date();
    const isCurrentMonthAndYear = today.getFullYear() === year && today.getMonth() === month;

    return [...blanks, ...daysArray].map((day, index) => (
      <div
        key={index}
        className={`p-1.5 text-center text-xs rounded-md ${
          day ? 'hover:bg-primary/10 cursor-pointer' : ''
        } ${day && isCurrentMonthAndYear && day === today.getDate() ? 'bg-primary text-primary-foreground font-semibold' : ''}
           ${day && day === 30 && month === 4 && year === 2025 ? 'bg-yellow-400 text-black font-semibold' : ''} `} // Highlight specific date
      >
        {day}
      </div>
    ));
  };

  const changeMonth = (offset) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
    <div className="bg-card p-4 rounded-xl shadow-lg border mb-6">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-card-foreground">Mi calendario</h4>
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => changeMonth(1)}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      <div className="text-center font-medium text-sm text-primary mb-2">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
        {dayNames.map(day => <div key={day} className="font-medium text-center">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      <div className="mt-3 flex justify-end space-x-2">
        <Button size="sm" variant="outline" className="text-xs border-primary text-primary hover:bg-primary/10">Mes</Button>
        <Button size="sm" className="text-xs bg-primary hover:opacity-90 text-primary-foreground">Agenda</Button>
      </div>
    </div>
  );
};

const ProgressWidget = () => (
  <div className="bg-card p-4 rounded-xl shadow-lg border mb-6">
    <h4 className="font-semibold text-card-foreground mb-3">Mi progreso</h4>
    <div className="flex justify-center items-center my-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-slate-200" // Use a lighter gray from the palette
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-primary" // Use brand primary color
            strokeWidth="3"
            strokeDasharray="75, 100" // Example progress
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-primary">
          75%
        </div>
      </div>
    </div>
    <ul className="text-xs space-y-1 text-muted-foreground">
      <li className="flex items-center"><span className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-2"></span>Sin comenzar</li>
      <li className="flex items-center"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>En curso</li>
      <li className="flex items-center"><span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>No validado</li>
      <li className="flex items-center"><span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>Validado</li>
    </ul>
  </div>
);

const StarsWidget = () => (
  <div className="bg-card p-4 rounded-xl shadow-lg border">
    <h4 className="font-semibold text-card-foreground mb-3">Mis estrellas</h4>
    <div className="grid grid-cols-5 gap-2">
      {[Activity, ListChecks, Award, PieChart, Users2].map((Icon, index) => (
        <Button key={index} variant="outline" className="h-14 w-full flex flex-col items-center justify-center p-1 hover:border-primary hover:bg-primary/10">
          <Icon size={24} className="text-muted-foreground group-hover:text-primary" />
        </Button>
      ))}
    </div>
  </div>
);


const ComunidadesPage = () => {
  const navigate = useNavigate();
  const companyName = "CrossLearning";

  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState("");

  const mockPosts = [
    { userName: "Ana Pérez", userAvatar: "https://i.pravatar.cc/150?u=ana", timeAgo: "Hace 2 horas", content: "¡Nuevo módulo de Metodologías Lean disponible! ¿Alguien ya lo empezó? Me encantaría escuchar sus primeras impresiones. #AprendizajeContinuo #LeanThinking", imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/0e1f7dd3-06a3-49ec-a3f5-eb9a3a70d9a6/9b49a768d721501b43421b62a9a101bd.png", likes: 15, comments: 3, shares: 2 },
    { userName: "Carlos López", userAvatar: "https://i.pravatar.cc/150?u=carlos", timeAgo: "Ayer a las 5:30 PM", content: "Comparto este artículo súper interesante sobre el futuro del trabajo remoto y cómo impacta la colaboración en equipos distribuidos. ¡Lectura recomendada! \n\nhttps://example.com/future-of-work", likes: 22, comments: 5, shares: 7 },
    { userName: "Laura Gómez", userAvatar: "https://i.pravatar.cc/150?u=laura", timeAgo: "Hace 3 días", content: "Recordatorio: Mañana tenemos la sesión de Q&A sobre la nueva plataforma de gestión de proyectos. ¡No falten! Dejen sus preguntas aquí si no pueden asistir.", likes: 8, comments: 1, shares: 0 },
  ];

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    console.log("Nuevo Post:", { content: postContent, tags });
    setPostContent("");
    setTags("");
  };

  return (
    <>
      <Seo
        title="Comunidades"
        description="Comunidades de aprendizaje colaborativo para el intercambio de conocimiento."
        path="/comunidades"
        image="/social/comunidades.jpg"
      />
      <div className="min-h-screen bg-slate-100">
        <div className="container mx-auto px-2 sm:px-4 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-6">
            <motion.aside 
              className="lg:col-span-3 lg:sticky lg:top-20 self-start mb-6 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary text-primary-foreground p-4 rounded-t-xl shadow-lg">
                <div className="flex items-center mb-2">
                  <UserCircle size={28} className="mr-2 opacity-80" />
                  <h3 className="text-lg font-semibold">Hola, Usuario</h3>
                </div>
                <p className="text-xs opacity-90">¡Bienvenido a la comunidad!</p>
              </div>
              <div className="bg-card p-4 rounded-b-xl shadow-lg border border-t-0">
                <div className="bg-primary/90 text-primary-foreground p-4 rounded-lg mb-4 text-sm">
                  <p className="font-semibold mb-1">En este muro podrás compartir contenidos y experiencias...</p>
                  <p className="text-xs opacity-90">Pulsa en el espacio en blanco para insertar texto o compartir contenidos.</p>
                  <p className="font-bold mt-1">¡Así que adelante!</p>
                </div>
                
                <Textarea
                  placeholder="Teclee aquí su mensaje..."
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary mb-2 h-24"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <div className="flex items-center space-x-2 mb-3 text-muted-foreground">
                  <span className="text-xs font-medium">Añadir:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500/10"><Video size={18} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-blue-500/10"><ImageIcon size={18} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:bg-green-500/10"><Paperclip size={18} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500 hover:bg-yellow-500/10"><Smile size={18} /></Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">más ▼</Button>
                </div>
                <Input
                  type="text"
                  placeholder="Añadir una etiqueta..."
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary mb-3 text-sm"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="text-xs text-muted-foreground hover:border-primary hover:text-primary">
                    Grupos
                  </Button>
                  <Button 
                    onClick={handlePostSubmit}
                    className="bg-primary hover:opacity-90 text-primary-foreground text-sm font-semibold py-2 px-4 rounded-md"
                  >
                    <Send size={16} className="mr-2" /> Enviar
                  </Button>
                </div>

                <hr className="my-6"/>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary">
                    <Home size={18} className="mr-3 text-primary" /> Mi Feed
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary">
                    <Users2 size={18} className="mr-3 text-primary" /> Grupos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary">
                    <Tag size={18} className="mr-3 text-primary" /> Temas Populares
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary">
                    <CalendarDays size={18} className="mr-3 text-primary" /> Eventos
                  </Button>
                </div>
              </div>
              <div className="bg-primary/90 text-primary-foreground p-4 rounded-lg mt-6 text-sm">
                  <p className="font-semibold mb-1">A continuación encontrarás noticias y los cursos...</p>
                  <p className="text-xs opacity-90">También encontrarás buenas prácticas compartidas.</p>
                  <p className="font-bold mt-1">¡Comparte tus conocimientos!</p>
                </div>
            </motion.aside>

            <main className="lg:col-span-6">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Feed de la Comunidad</h2>
                  <div className="flex items-center space-x-2">
                      <Input type="search" placeholder="Buscar en el feed..." className="h-9 text-sm w-48" />
                      <Button variant="outline" size="sm" className="text-muted-foreground hover:border-primary hover:text-primary">
                          <Filter size={16} className="mr-1" /> Filtros
                      </Button>
                  </div>
              </div>
              {mockPosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
              <div className="text-center my-8">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                      Cargar más publicaciones
                  </Button>
              </div>
            </main>

            <motion.aside 
              className="lg:col-span-3 lg:sticky lg:top-20 self-start"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CalendarWidget />
              <ProgressWidget />
              <StarsWidget />
              
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full mt-6 border-primary text-primary hover:bg-primary/10 hover:text-primary flex items-center"
              >
                <Home size={18} className="mr-2" />
                Volver a Inicio
              </Button>
            </motion.aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComunidadesPage;