import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export const ObjetivoForm = ({ onSave, onCancel, existingGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [goalType, setGoalType] = useState('Otro');
  const [goalCategory, setGoalCategory] = useState('');
  
  const { toast } = useToast();

  useEffect(() => {
    if (existingGoal) {
      setTitle(existingGoal.title);
      setDescription(existingGoal.description);
      setLevel(existingGoal.level);
      setDueDate(format(new Date(existingGoal.dueDate), 'yyyy-MM-dd'));
      setProgress(existingGoal.progress);
      setGoalType(existingGoal.goalType);
      setGoalCategory(existingGoal.goalCategory);
    }
  }, [existingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !level || !dueDate || !goalType || !goalCategory) {
      toast({
        variant: 'destructive',
        title: 'Campos incompletos',
        description: 'Por favor, rellena todos los campos para guardar el objetivo.',
      });
      return;
    }
    onSave({ title, description, level, dueDate, progress, goalType, goalCategory });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
       <div className="grid gap-2">
        <Label htmlFor="goal-type">Tipo de Objetivo</Label>
        <Select value={goalType} onValueChange={setGoalType}>
          <SelectTrigger id="goal-type">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SMART Semanal">SMART Semanal</SelectItem>
            <SelectItem value="SMART Mensual">SMART Mensual</SelectItem>
            <SelectItem value="Otro">Otro (Personalizado)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Título del Objetivo</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Hacer ejercicio 3 veces por semana"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe cómo alcanzarás este objetivo."
        />
      </div>
       <div className="grid gap-2">
        <Label htmlFor="goal-category">Categoría</Label>
        <Input
          id="goal-category"
          value={goalCategory}
          onChange={(e) => setGoalCategory(e.target.value)}
          placeholder="Ej: Salud, Productividad..."
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="level">Nivel</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger id="level">
            <SelectValue placeholder="Selecciona un nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Mi Grupo de Trabajo">Mi Grupo de Trabajo</SelectItem>
            <SelectItem value="Organizacional">Organizacional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dueDate">Fecha Límite</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-background pb-2 -mx-4 px-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Objetivo</Button>
      </div>
    </form>
  );
};