import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, Gem, Shield, Users, Compass, FileText, Lightbulb, TrendingUp, Share2, Check, UserCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';

const ranks = [
  { name: 'Navegante Hábil', points: 0, icon: Compass },
  { name: 'Capitán de Flota', points: 250, icon: Award },
  { name: 'Almirante Legendario', points: 500, icon: Gem },
];

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Gamificacion = () => {
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [userBadges, setUserBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastSeenRank, setLastSeenRank] = useState(null);
  const [width, height] = useWindowSize();

  const badges = useMemo(() => [
    { id: 'explorador-xr', name: 'Explorador XR', description: 'Completaste el Quiz de Ambientación y la Asignación de Tripulación.', icon: Shield, criteria: data => data.quizCompleted && data.assignmentCompleted },
    { id: 'colaborador-estrategico', name: 'Colaborador Estratégico', description: 'Has completado 5 o más tareas en la dimensión de "Colaboración".', icon: UserCheck, criteria: data => {
        const collaborationTasks = data.abcTasks.filter(t => t.dimension === 'Colaboración' && t.rating > 0);
        return collaborationTasks.length >= 5;
    }},
    { id: 'informe-navegacion', name: 'Informe de Navegación', description: 'Completaste al menos una tarea en cada tipo de aprendizaje.', icon: FileText, criteria: data => {
        const completedDimensions = new Set(data.abcTasks.filter(t => t.rating > 0).map(t => t.dimension));
        return completedDimensions.size >= 6;
    }},
    { id: 'innovador-tripulacion', name: 'Innovador de Tripulación', description: 'Has añadido 10 o más comentarios en total.', icon: Lightbulb, criteria: data => {
        const commentsCount = data.abcTasks.reduce((acc, task) => acc + (task.comments ? task.comments.length : 0), 0);
        return commentsCount >= 10;
    }},
  ], []);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints') || '0', 10);
    const storedBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');
    const storedRankName = localStorage.getItem('userRankName');

    setPoints(storedPoints);
    setUserBadges(storedBadges.length > 0 ? storedBadges : badges.map(b => ({...b, unlocked: false, unlockedAt: null})));
    setLastSeenRank(ranks.find(r => r.name === storedRankName) || ranks[0]);
  }, [badges]);

  useEffect(() => {
    const allChallenges = JSON.parse(localStorage.getItem('manualDelMarChallenges') || '[]');
    const challengesCompleted = allChallenges.filter(c => c.status === 'completed');
    const quizCompleted = localStorage.getItem('quizCompleted') === 'true';
    const assignmentCompleted = localStorage.getItem('assignmentCompleted') === 'true';
    const savedAbcTasks = localStorage.getItem('abcAdventureTasks');
    const abcTasks = savedAbcTasks ? JSON.parse(savedAbcTasks) : [];

    let calculatedPoints = 0;
    if (quizCompleted) calculatedPoints += 50;
    if (assignmentCompleted) calculatedPoints += 50;
    
    challengesCompleted.forEach(c => {
      const isOnTime = new Date() < new Date(c.deadline);
      calculatedPoints += isOnTime ? 50 : 25;
    });

    abcTasks.forEach(task => {
        if(task.rating && task.rating > 0) {
            calculatedPoints += (task.rating * 5);
        }
    });

    setPoints(calculatedPoints);
    localStorage.setItem('userPoints', calculatedPoints.toString());

    const currentRankIndex = ranks.slice().reverse().findIndex(r => calculatedPoints >= r.points);
    const currentRank = ranks[ranks.length - 1 - currentRankIndex];
    
    const criteriaData = {
        quizCompleted,
        assignmentCompleted,
        currentRank,
        abcTasks
    };
    
    const updatedBadges = userBadges.map(badge => {
        if (!badge.unlocked && badge.criteria(criteriaData)) {
            toast({
                title: "🏅 ¡Insignia Desbloqueada!",
                description: `Has ganado la insignia: ${badge.name}`,
            });
            return { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
        }
        return badge;
    });
    setUserBadges(updatedBadges);
    localStorage.setItem('userBadges', JSON.stringify(updatedBadges));

    if (lastSeenRank && currentRank.name !== lastSeenRank.name && currentRank.points > lastSeenRank.points) {
      setShowConfetti(true);
      toast({
        title: '🎉 ¡Has subido de Nivel!',
        description: `Ahora eres ${currentRank.name}. ¡Sigue así!`,
      });
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setLastSeenRank(currentRank);
    localStorage.setItem('userRankName', currentRank.name);

  }, [badges, lastSeenRank, toast]);

  const currentRankIndex = useMemo(() => ranks.slice().reverse().findIndex(r => points >= r.points), [points]);
  const currentRank = useMemo(() => ranks[ranks.length - 1 - currentRankIndex], [currentRankIndex]);
  const nextRank = useMemo(() => ranks[ranks.length - currentRankIndex] || currentRank, [currentRankIndex, currentRank]);
  
  const progressToNextRank = useMemo(() => nextRank.points > currentRank.points 
    ? ((points - currentRank.points) / (nextRank.points - currentRank.points)) * 100
    : 100, [points, currentRank, nextRank]);

  const RankIcon = currentRank.icon;
  
  const handleBadgeClick = (badge) => {
    if (badge.unlocked) {
      setSelectedBadge(badge);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`¡He ganado la insignia "${selectedBadge.name}" en la Experiencia Tripulaciones!`);
    toast({ title: '✅ Copiado al portapapeles', description: '¡Comparte tu logro!' });
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <div className="space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-lg bg-muted/50 border"
              >
                {points === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    <p className="font-semibold">¡Empieza a ganar puntos hoy!</p>
                    <p className="text-sm">Completa retos para subir de nivel.</p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-baseline mb-1">
                        <h5 className="font-semibold text-primary flex items-center gap-2">
                            <RankIcon size={20} />
                            {currentRank.name}
                        </h5>
                        <span className="text-sm font-bold text-foreground">{points} Puntos</span>
                      </div>
                      <Progress value={progressToNextRank} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-500" />
                      <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                        <span>Nivel actual</span>
                        <span>{nextRank.points > currentRank.points ? `${nextRank.points - points} pts para ${nextRank.name}` : 'Rango Máximo'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Los puntos se suman al completar retos y actividades.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div>
          <h5 className="font-semibold mb-3">Insignias</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userBadges.map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleBadgeClick(badge)}
                  className={`p-3 text-center rounded-lg border-2 transition-all duration-300 ${badge.unlocked ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-900/20 hover:shadow-md hover:border-amber-500 cursor-pointer' : 'border-dashed bg-background'}`}
                  title={badge.description}
                >
                  <BadgeIcon size={32} className={`mx-auto mb-2 ${badge.unlocked ? 'text-amber-500' : 'text-muted-foreground/50'}`} />
                  <p className={`text-xs font-semibold ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground/80'}`}>
                    {badge.name}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      
      {selectedBadge && (
         <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
            <DialogContent>
              <DialogHeader>
                  <DialogTitle className="flex flex-col items-center text-center gap-2">
                      <selectedBadge.icon className="w-16 h-16 text-amber-500" />
                      <span className="text-2xl">{selectedBadge.name}</span>
                  </DialogTitle>
                  <DialogDescription className="text-center pt-2">
                    {selectedBadge.description}
                  </DialogDescription>
              </DialogHeader>
              <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><Check className="text-green-500" size={16}/> Desbloqueada el:</p>
                  <p className="font-semibold">{new Date(selectedBadge.unlockedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <Button onClick={handleShare} className="w-full">
                  <Share2 className="mr-2" size={16}/> Compartir Logro
              </Button>
            </DialogContent>
         </Dialog>
      )}
    </>
  );
};

export default Gamificacion;