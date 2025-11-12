import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, MessageSquare, Video, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialSessions = [
    { 
        id: 1, 
        title: 'Revisión de Avances Q1', 
        date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), 
        mode: 'virtual', 
        mentorFeedback: 'Excelente progreso en la calibración del sonar. Sugiero enfocarse ahora en los protocolos de comunicación.', 
        menteeFeedback: 'La guía fue muy útil. Me siento más seguro con las tareas asignadas.' 
    },
    { 
        id: 2, 
        title: 'Planificación de la Expedición', 
        date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), 
        mode: 'presencial', 
        mentorFeedback: '', 
        menteeFeedback: '' 
    },
];

const SoporteTutoria = ({ description }) => {
    const [sessions, setSessions] = useState([]);
    const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
    const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [currentFeedback, setCurrentFeedback] = useState({ mentor: '', mentee: '', sessionId: null });

    useEffect(() => {
        const storedSessions = localStorage.getItem('tutoringSessions');
        if (storedSessions) {
            try {
                const parsed = JSON.parse(storedSessions);
                setSessions(Array.isArray(parsed) ? parsed : initialSessions);
            } catch (error) {
                setSessions(initialSessions);
            }
        } else {
            setSessions(initialSessions);
        }
    }, []);

    const saveSessions = (newSessions) => {
        setSessions(newSessions);
        localStorage.setItem('tutoringSessions', JSON.stringify(newSessions));
    };

    const handleSaveSession = (sessionData) => {
        if (editingSession) {
            const newSessions = sessions.map(s => s.id === editingSession.id ? { ...s, ...sessionData } : s);
            saveSessions(newSessions);
        } else {
            const newSession = { id: Date.now(), ...sessionData, mentorFeedback: '', menteeFeedback: '' };
            saveSessions([...sessions, newSession]);
        }
        setIsSessionDialogOpen(false);
        setEditingSession(null);
    };

    const handleEditSession = (session) => {
        setEditingSession(session);
        setIsSessionDialogOpen(true);
    };
    
    const handleDeleteSession = (sessionId) => {
        saveSessions(sessions.filter(s => s.id !== sessionId));
    };

    const handleOpenFeedbackDialog = (session) => {
        setCurrentFeedback({ mentor: session.mentorFeedback, mentee: session.menteeFeedback, sessionId: session.id });
        setIsFeedbackDialogOpen(true);
    };
    
    const handleSaveFeedback = () => {
        if (currentFeedback.sessionId === null) return;
        const updatedSessions = sessions.map(s => 
            s.id === currentFeedback.sessionId 
            ? { ...s, mentorFeedback: currentFeedback.mentor, menteeFeedback: currentFeedback.mentee }
            : s
        );
        saveSessions(updatedSessions);
        setIsFeedbackDialogOpen(false);
        setCurrentFeedback({ mentor: '', mentee: '', sessionId: null });
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{description}</p>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Encuentros de Tutoría</CardTitle>
                        <Button onClick={() => { setEditingSession(null); setIsSessionDialogOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> Agendar Sesión
                        </Button>
                    </div>
                    <CardDescription>Agenda sesiones, registra retroalimentación y acompaña el progreso.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <AnimatePresence>
                        {sessions.map(session => (
                            <motion.div
                                key={session.id}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <SessionCard 
                                    session={session} 
                                    onEdit={handleEditSession}
                                    onDelete={handleDeleteSession}
                                    onAddFeedback={handleOpenFeedbackDialog}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </CardContent>
            </Card>

            <SessionDialog 
                isOpen={isSessionDialogOpen}
                onOpenChange={setIsSessionDialogOpen}
                onSave={handleSaveSession}
                session={editingSession}
            />

            <FeedbackDialog
                isOpen={isFeedbackDialogOpen}
                onOpenChange={setIsFeedbackDialogOpen}
                onSave={handleSaveFeedback}
                feedback={currentFeedback}
                setFeedback={setCurrentFeedback}
            />
        </div>
    );
};

const SessionCard = ({ session, onEdit, onAddFeedback }) => (
    <Card className="bg-background/80">
        <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-foreground">{session.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        📅 {new Date(session.date).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {session.mode === 'virtual' ? <Video className="h-4 w-4 text-primary" /> : <Users className="h-4 w-4 text-primary" />}
                        <span className="capitalize">{session.mode}</span>
                    </p>
                </div>
                <div className="flex gap-1">
                     <Button variant="ghost" size="icon" onClick={() => onEdit(session)}><Edit className="h-4 w-4" /></Button>
                </div>
            </div>
            
            {(session.mentorFeedback || session.menteeFeedback) ? (
                <div className="text-sm mt-2 space-y-2 p-3 bg-muted/50 rounded-md border">
                    <p>🧑‍🏫 <strong className="font-medium">Mentor:</strong> {session.mentorFeedback || '—'}</p>
                    <p>🧑‍🎓 <strong className="font-medium">Tripulante:</strong> {session.menteeFeedback || '—'}</p>
                    <Button variant="link" className="p-0 h-auto text-xs" onClick={() => onAddFeedback(session)}>Editar Feedback</Button>
                </div>
            ) : (
                <Button variant="outline" size="sm" onClick={() => onAddFeedback(session)}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Añadir Feedback
                </Button>
            )}
        </CardContent>
    </Card>
);

const SessionDialog = ({ isOpen, onOpenChange, onSave, session }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('virtual');

    useEffect(() => {
        if (session) {
            setTitle(session.title);
            setDate(session.date ? new Date(session.date).toISOString().slice(0, 16) : '');
            setMode(session.mode);
        } else {
            setTitle('');
            setDate('');
            setMode('virtual');
        }
    }, [session, isOpen]);
    
    const handleSubmit = () => {
        if (!title || !date) return;
        onSave({ title, date, mode });
    };

    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{session ? 'Editar Sesión' : 'Agendar Sesión'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Revisión semanal" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Fecha y Hora</Label>
                        <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Modalidad</Label>
                        <div className="flex gap-4">
                            <Label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="mode" value="virtual" checked={mode === 'virtual'} onChange={() => setMode('virtual')} className="accent-primary"/>
                                Virtual
                            </Label>
                            <Label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="mode" value="presencial" checked={mode === 'presencial'} onChange={() => setMode('presencial')} className="accent-primary" />
                                Presencial
                            </Label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSubmit}>Guardar Sesión</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const FeedbackDialog = ({ isOpen, onOpenChange, onSave, feedback, setFeedback }) => {
    if (!isOpen) return null;
    
    const handleSubmit = () => {
        onSave();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registro de Feedback</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid gap-2">
                         <Label htmlFor="mentor-feedback">Feedback del Mentor (Capitán)</Label>
                         <Textarea 
                            id="mentor-feedback"
                            placeholder="Anotaciones, sugerencias y próximos pasos..."
                            value={feedback.mentor}
                            onChange={(e) => setFeedback({ ...feedback, mentor: e.target.value })}
                         />
                    </div>
                    <div className="grid gap-2">
                         <Label htmlFor="mentee-feedback">Reflexiones del Tripulante</Label>
                         <Textarea 
                            id="mentee-feedback"
                            placeholder="Dudas, aprendizajes y sensaciones..."
                            value={feedback.mentee}
                            onChange={(e) => setFeedback({ ...feedback, mentee: e.target.value })}
                         />
                    </div>
                </div>
                <DialogFooter>
                     <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                     <Button onClick={handleSubmit}>Guardar Feedback</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SoporteTutoria;