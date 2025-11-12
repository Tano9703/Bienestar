import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Plus, Pencil, Trash2, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockUsers = [
    { id: 'user1', name: 'Capitán Nemo', avatarSeed: 'nemo' },
    { id: 'user2', name: 'Ana de Armas', avatarSeed: 'ana' },
    { id: 'user3', name: 'Carlos Vela', avatarSeed: 'carlos' },
    { id: 'user4', name: 'Tú', avatarSeed: 'you' },
];

const initialTasks = [
    { id: 1, title: 'Revisar cartografía de la nueva ruta', description: 'Validar las cartas naúticas para la expedición a la Isla Escondida.', completed: true, responsible: 'user1', deadline: '2025-07-15' },
    { id: 2, title: 'Inventario de provisiones', description: 'Asegurar que tenemos todos los suministros necesarios para 30 días de viaje.', completed: false, responsible: 'user2', deadline: '2025-07-20' },
    { id: 3, title: 'Calibración del sonar', description: 'Realizar las pruebas de calibración del sistema de sonar principal.', completed: false, responsible: 'user3', deadline: '2025-07-22' },
];

const AsignacionTareas = ({ description }) => {
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('missionTasks');
        if (storedTasks) {
            try {
                const parsed = JSON.parse(storedTasks);
                if (Array.isArray(parsed)) {
                    setTasks(parsed);
                } else {
                    setTasks(initialTasks);
                }
            } catch (error) {
                setTasks(initialTasks);
            }
        } else {
            setTasks(initialTasks);
        }
    }, []);

    const saveTasks = (newTasks) => {
        setTasks(newTasks);
        localStorage.setItem('missionTasks', JSON.stringify(newTasks));
    };

    const handleToggleComplete = (taskId) => {
        const newTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        saveTasks(newTasks);
    };

    const handleSaveTask = (taskData) => {
        if (editingTask) {
            const newTasks = tasks.map(task =>
                task.id === editingTask.id ? { ...task, ...taskData } : task
            );
            saveTasks(newTasks);
        } else {
            const newTask = {
                id: Date.now(),
                ...taskData,
                completed: false
            };
            saveTasks([...tasks, newTask]);
        }
        setIsDialogOpen(false);
        setEditingTask(null);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    };

    const handleDelete = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        saveTasks(newTasks);
    };

    const openNewTaskDialog = () => {
        setEditingTask(null);
        setIsDialogOpen(true);
    };

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{description}</p>
            <Card>
                <CardHeader>
                    <CardTitle>Checklist de Misión</CardTitle>
                    <CardDescription>Progreso: {completedTasks} de {totalTasks} tareas completadas.</CardDescription>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent>
                    <Button onClick={openNewTaskDialog} className="mb-4">
                        <Plus className="mr-2 h-4 w-4" /> Añadir Tarea
                    </Button>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {tasks.map(task => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center gap-4 p-3 rounded-lg border ${task.completed ? 'bg-muted/50' : 'bg-background'}`}
                                >
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => handleToggleComplete(task.id)}
                                        id={`task-${task.id}`}
                                    />
                                    <div className="flex-grow">
                                        <label
                                            htmlFor={`task-${task.id}`}
                                            className={`font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                                        >
                                            {task.title}
                                        </label>
                                        <p className="text-xs text-muted-foreground">{task.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span>{mockUsers.find(u => u.id === task.responsible)?.name || 'Sin asignar'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{task.deadline}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>

            <TaskDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveTask}
                task={editingTask}
                users={mockUsers}
            />
        </div>
    );
};

const TaskDialog = ({ isOpen, onOpenChange, onSave, task, users }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsible, setResponsible] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setResponsible(task.responsible);
            setDeadline(task.deadline);
        } else {
            setTitle('');
            setDescription('');
            setResponsible('');
            setDeadline('');
        }
    }, [task, isOpen]);

    const handleSubmit = () => {
        if (!title || !responsible || !deadline) return;
        onSave({ title, description, responsible, deadline });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Qué hay que hacer?"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Añade más detalles..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="responsible">Responsable</Label>
                            <Select value={responsible} onValueChange={setResponsible}>
                                <SelectTrigger id="responsible">
                                    <SelectValue placeholder="Asignar a..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id}>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/jsx?seed=${user.avatarSeed}`} />
                                                    <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="deadline">Fecha Límite</Label>
                            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSubmit}>Guardar Tarea</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AsignacionTareas;