import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format, isPast, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export const ObjetivoCard = ({ goal, onEdit, onDelete, onUpdateProgress }) => {
  const { toast } = useToast();

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleUpdateProgressClick = (e) => {
    e.stopPropagation();
     toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(goal);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(goal);
  }

  const dueDate = new Date(goal.dueDate);
  const isOverdue = isPast(dueDate) && goal.progress < 100;
  const daysRemaining = differenceInDays(dueDate, new Date());
  const isNearDeadline = daysRemaining <= 7 && daysRemaining >= 0 && goal.progress < 100;

  const getProgressColor = () => {
    if (goal.progress === 100) return 'bg-green-500';
    if (isOverdue) return 'bg-red-500';
    if (isNearDeadline) return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <motion.div 
      variants={cardVariants}
      onClick={() => onEdit(goal)}
    >
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-l-4 cursor-pointer" style={{ borderColor: getProgressColor() }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-primary pr-4">{goal.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditClick}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUpdateProgressClick}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Actualizar Progreso</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="text-sm pt-2">{goal.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-2 pb-4">
          <div className="mb-4">
            <span className="inline-block bg-muted text-muted-foreground text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{goal.goalCategory}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="w-full h-2" indicatorClassName={getProgressColor()} />
          </div>
        </CardContent>
        <CardFooter>
          <p className={cn("text-xs", isOverdue ? "text-red-500 font-semibold" : "text-muted-foreground")}>
            Vence: {goal.dueDate ? format(dueDate, "d 'de' MMMM, yyyy", { locale: es }) : 'N/A'}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};