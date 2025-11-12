import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, User, Users, Building, Search } from 'lucide-react';
import { ObjetivoCard } from '@/components/objetivos/ObjetivoCard';
import { ObjetivoForm } from '@/components/objetivos/ObjetivoForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

const initialGoals = [
  { id: 1, title: 'Meditar 10 minutos al día', description: 'Usar la app Calm para sesiones guiadas.', progress: 75, level: 'Personal', dueDate: '2025-07-31', goalType: 'SMART Semanal', goalCategory: 'Salud Emocional', status: 'activo' },
  { id: 2, title: 'Mejorar la comunicación del equipo', description: 'Implementar reuniones diarias de 15 minutos.', progress: 40, level: 'Mi Grupo de Trabajo', dueDate: '2025-08-15', goalType: 'SMART Mensual', goalCategory: 'Productividad', status: 'activo' },
  { id: 3, title: 'Promover pausas activas', description: 'Organizar sesiones de estiramiento de 5 minutos.', progress: 60, level: 'Organizacional', dueDate: '2025-08-30', goalType: 'Otro', goalCategory: 'Bienestar Físico', status: 'activo' },
  { id: 4, title: 'Leer un libro al mes', description: 'Dedicar 30 minutos a la lectura antes de dormir.', progress: 100, level: 'Personal', dueDate: '2025-07-30', goalType: 'SMART Mensual', goalCategory: 'Desarrollo', status: 'cumplido' },
  { id: 5, title: 'Feedback constructivo semanal', description: 'Espacio seguro para dar y recibir feedback.', progress: 25, level: 'Mi Grupo de Trabajo', dueDate: '2025-09-01', goalType: 'SMART Semanal', goalCategory: 'Colaboración', status: 'activo' },
  { id: 6, title: 'Terminar curso de React', description: 'Completar el curso avanzado de React en la plataforma.', progress: 20, level: 'Personal', dueDate: '2025-07-10', goalType: 'SMART Mensual', goalCategory: 'Carrera', status: 'vencido' },
];

const ObjetivosBienestarContent = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const { toast } = useToast();

  const handleCreateNew = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleSave = (goalData) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...g, ...goalData } : g));
      toast({ title: "¡Éxito!", description: "Objetivo actualizado correctamente." });
    } else {
      const newGoal = {
        id: goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1,
        ...goalData,
        status: 'activo',
      };
      setGoals([...goals, newGoal]);
      toast({ title: "¡Éxito!", description: "Nuevo objetivo creado." });
    }
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteRequest = (goal) => {
    setGoalToDelete(goal);
  };

  const confirmDelete = () => {
    if (goalToDelete) {
      setGoals(goals.filter(g => g.id !== goalToDelete.id));
      toast({
        variant: 'destructive',
        title: 'Objetivo eliminado',
        description: `El objetivo "${goalToDelete.title}" ha sido eliminado.`,
      });
      setGoalToDelete(null);
    }
  };

  const handleUpdateProgress = (goalId, newProgress) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress, status: newProgress === 100 ? 'cumplido' : g.status } : g));
  };
  
  const filteredGoals = useMemo(() => {
    return goals.filter(goal => {
      const searchMatch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          goal.goalCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'todos' || goal.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [goals, searchTerm, statusFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const renderGoals = (level) => {
    const goalsByLevel = filteredGoals.filter(g => g.level === level);
    if (goalsByLevel.length === 0) {
      return <div className="text-center py-16 text-muted-foreground col-span-full">No se encontraron objetivos para esta categoría y filtros.</div>;
    }
    return goalsByLevel.map(goal => (
      <ObjetivoCard key={goal.id} goal={goal} onEdit={handleEdit} onDelete={handleDeleteRequest} onUpdateProgress={handleUpdateProgress} />
    ));
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6 flex-wrap gap-4"
      >
        <div></div>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Nuevo Objetivo
        </Button>
      </motion.div>
      
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex-grow min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por título, descripción, categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="cumplido">Cumplido</SelectItem>
            <SelectItem value="vencido">Vencido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="Personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="Personal"><User className="mr-2 h-4 w-4" />Personales</TabsTrigger>
          <TabsTrigger value="Mi Grupo de Trabajo"><Users className="mr-2 h-4 w-4" />Mi Grupo de Trabajo</TabsTrigger>
          <TabsTrigger value="Organizacional"><Building className="mr-2 h-4 w-4" />Organizacionales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Personal">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {renderGoals('Personal')}
          </motion.div>
        </TabsContent>
        <TabsContent value="Mi Grupo de Trabajo">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {renderGoals('Mi Grupo de Trabajo')}
          </motion.div>
        </TabsContent>
        <TabsContent value="Organizacional">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {renderGoals('Organizacional')}
          </motion.div>
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingGoal ? 'Editar Objetivo' : 'Crear Nuevo Objetivo'}</DialogTitle>
            <DialogDescription>
              {editingGoal ? 'Actualiza los detalles de tu objetivo.' : 'Define un nuevo objetivo para mejorar tu bienestar.'}
            </DialogDescription>
          </DialogHeader>
          <ObjetivoForm onSave={handleSave} onCancel={() => setIsFormOpen(false)} existingGoal={editingGoal} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!goalToDelete} onOpenChange={() => setGoalToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el objetivo
              <strong className="text-foreground"> "{goalToDelete?.title}"</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default ObjetivosBienestarContent;