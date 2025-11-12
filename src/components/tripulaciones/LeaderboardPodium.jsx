import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const mockParticipants = [
  { id: 'user2', name: 'Ana', avatarSeed: 'ana', score: 125 },
  { id: 'user3', name: 'Carlos', avatarSeed: 'carlos', score: 90 },
  { id: 'user4', name: 'Sofía', avatarSeed: 'sofia', score: 150 },
];

const LeaderboardPodium = ({ tasks }) => {
  const currentUserScore = tasks.reduce((acc, task) => acc + (task.rating || 0), 0);
  const currentUser = { id: 'currentUser', name: 'Tú', avatarSeed: 'you', score: currentUserScore };

  const allParticipants = [...mockParticipants, currentUser].sort((a, b) => b.score - a.score);
  const topThree = allParticipants.slice(0, 3);

  const getPodiumClass = (index) => {
    switch (index) {
      case 0: return 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 1: return 'border-slate-400 bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300';
      case 2: return 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      default: return 'border-border';
    }
  };

  const podiumOrder = [
    topThree.find((_, i) => i === 1),
    topThree.find((_, i) => i === 0),
    topThree.find((_, i) => i === 2)
  ].filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          Podio de la Aventura
        </CardTitle>
        <CardDescription>Los tripulantes con mejor desempeño en sus tareas.</CardDescription>
      </CardHeader>
      <CardContent>
        {topThree.length > 0 ? (
          <div className="flex justify-center items-end gap-2 sm:gap-4 pt-4">
            {podiumOrder.map((participant) => {
              const rank = topThree.findIndex(p => p.id === participant.id);
              const isFirst = rank === 0;
              const isSecond = rank === 1;
              const heightClass = isFirst ? 'h-32' : (isSecond ? 'h-24' : 'h-16');

              return (
                <motion.div
                  key={participant.id}
                  className="flex flex-col items-center gap-2 flex-1 max-w-[150px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rank * 0.1 + 0.1 }}
                >
                  <div className="relative">
                    <Avatar className={`w-16 h-16 sm:w-20 sm:h-20 border-4 ${isFirst ? 'border-yellow-400' : 'border-transparent'}`}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/jsx?seed=${participant.avatarSeed}`} alt={participant.name} />
                      <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getPodiumClass(rank)}`}>
                         {rank + 1}
                       </div>
                    </div>
                  </div>
                  <p className="font-bold text-center truncate w-full">{participant.name}</p>
                  <div className={`w-full text-center p-2 rounded-t-lg ${getPodiumClass(rank)} ${heightClass} flex flex-col justify-center`}>
                     <p className="font-extrabold text-2xl">{participant.score}</p>
                     <p className="text-xs">puntos</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p>¡El podio espera a sus héroes!</p>
            <p className="text-sm">Completa y califica tus tareas para empezar a competir.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardPodium;