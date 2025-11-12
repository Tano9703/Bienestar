import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, CalendarDays, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import getChallengeIcon from '@/components/tripulaciones/challengeIcons';

const ChallengeCard = ({ challenge, onSelect, index }) => {
  const Icon = getChallengeIcon(challenge.icon);
  const isLocked = challenge.status === 'locked';
  const isCompleted = challenge.status === 'completed';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const hasDeadline = challenge.deadline && !isLocked;
  const hasAttachments = challenge.attachments && challenge.attachments.length > 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: isLocked ? 1 : 1.05, zIndex: 10 }}
      whileTap={{ scale: isLocked ? 1 : 0.98 }}
      onClick={() => onSelect(challenge)}
      className={cn(
        "relative p-4 aspect-square rounded-lg border-2 flex flex-col justify-between items-center text-center transition-all duration-300 overflow-hidden group",
        isLocked
          ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
          : "bg-background border-border hover:border-primary/80 hover:shadow-lg cursor-pointer",
        isCompleted && "border-green-500/50 bg-green-50/50"
      )}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 p-1 bg-green-500 text-white rounded-full z-10" title="Completado">
          <CheckCircle size={16} />
        </div>
      )}
      {isLocked && (
        <div className="absolute top-2 right-2 p-1 bg-slate-300 text-white rounded-full z-10" title="Bloqueado">
          <Lock size={16} />
        </div>
      )}

      {hasAttachments && (
        <Paperclip size={14} className="absolute bottom-2 left-2 text-muted-foreground" title="Contiene adjuntos"/>
      )}

      <div className="flex-grow flex items-center justify-center">
        <Icon size={48} className={cn(isLocked ? "text-slate-300" : "text-primary/90", "transition-transform group-hover:scale-110")} />
      </div>

      <div className="w-full">
        <h5 className={cn(
          "font-semibold text-sm",
          isLocked ? "text-slate-500" : "text-foreground"
        )}>
          {challenge.title}
        </h5>
        {hasDeadline && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-1">
            <CalendarDays size={12} />
            <span>{new Date(challenge.deadline).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChallengeCard;