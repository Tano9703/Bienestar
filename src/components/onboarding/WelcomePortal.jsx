import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayCircle, Clock, Users, Ship } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const WelcomePortal = ({ timelineEvents, successStories, onTimelineClick, onStoryClick }) => {
  const { toast } = useToast();
  const handleAction = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica estará disponible próximamente.",
    });
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30">
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
            <Ship className="w-8 h-8" />
            Portal de Bienvenida Personalizado
          </CardTitle>
          <CardDescription>Tu aventura comienza aquí. ¡Bienvenido a bordo!</CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid gap-6">
          <motion.div variants={itemVariants} className="relative rounded-lg overflow-hidden group cursor-pointer" onClick={handleAction}>
            <img alt="CEO giving a welcome message" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1512580563972-c8acce304aae" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
            </div>
            <p className="absolute bottom-2 left-3 text-white font-semibold">Mensaje del CEO</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2 mb-3"><Clock className="w-5 h-5 text-primary" /> Timeline Interactivo</h4>
            <div className="relative pl-4 border-l-2 border-primary/30 space-y-4">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative cursor-pointer group" onClick={() => onTimelineClick(event, i)}>
                  <div className="absolute -left-[23px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-background transition-transform group-hover:scale-125"></div>
                  <p className="font-medium group-hover:text-primary">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><Users className="w-5 h-5 text-primary" /> Historias de Éxito</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {successStories.map((story, i) => (
                <div key={story.name} className="flex-shrink-0 text-center space-y-1 cursor-pointer" onClick={() => onStoryClick(story, i)}>
                  <Avatar className="w-16 h-16 mx-auto border-2 border-primary/50 hover:border-primary transition-colors">
                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/jsx?seed=${story.name}`} />
                    <AvatarFallback>{story.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{story.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomePortal;