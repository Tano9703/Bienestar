import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import { Lock, Medal, CheckSquare, UserCheck, Linkedin, Share2, Pencil, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BadgeIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <circle cx="50" cy="50" r="45" fill="url(#gold_gradient)"/>
        <path d="M50 10 L61.8 38.1L92.4 38.1L69.3 55.9L80.9 84L50 66.2L19.1 84L30.7 55.9L7.6 38.1L38.2 38.1L50 10Z" fill="url(#blue_gradient)" stroke="#FFFFFF" strokeWidth="2"/>
        <defs>
            <linearGradient id="gold_gradient" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047"/>
                <stop offset="1" stopColor="#F59E0B"/>
            </linearGradient>
            <linearGradient id="blue_gradient" x1="50" y1="10" x2="50" y2="84" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA"/>
                <stop offset="1" stopColor="#2563EB"/>
            </linearGradient>
        </defs>
    </svg>
);


const PremioInicio = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [badgeName, setBadgeName] = useState(localStorage.getItem('badgeName') || 'Explorador XR');
    const [isEditingBadgeName, setIsEditingBadgeName] = useState(false);
    const [tempBadgeName, setTempBadgeName] = useState('');

    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [isAssignmentCompleted, setIsAssignmentCompleted] = useState(false);

    useEffect(() => {
        const checkCompletion = () => {
            const quizDone = localStorage.getItem('quizCompleted') === 'true';
            const assignmentDone = localStorage.getItem('surveyCompleted') === 'true';
            setIsQuizCompleted(quizDone);
            setIsAssignmentCompleted(assignmentDone);
        };

        checkCompletion();
        window.addEventListener('storage', checkCompletion);

        return () => {
            window.removeEventListener('storage', checkCompletion);
        };
    }, []);
    
    useEffect(() => {
        localStorage.setItem('badgeName', badgeName);
    }, [badgeName]);

    const handleShare = () => {
        const text = `¡He ganado la insignia "${badgeName}" en mi onboarding en la empresa! 🚀 #LogroProfesional #Onboarding`;
        const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };
    
    const handleEditBadgeName = () => {
        setTempBadgeName(badgeName);
        setIsEditingBadgeName(true);
    };

    const handleSaveBadgeName = () => {
        if(tempBadgeName.trim() !== '') {
            setBadgeName(tempBadgeName.trim());
        }
        setIsEditingBadgeName(false);
    };

    const isUnlocked = isQuizCompleted && isAssignmentCompleted;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm text-center">
             <AnimatePresence mode="wait">
                {isUnlocked ? (
                    <motion.div
                        key="unlocked"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <BadgeIcon />
                        <div className="my-4">
                            <p className="text-sm text-green-600 font-semibold">¡FELICIDADES!</p>
                            <div className="flex items-center gap-2 justify-center mt-1">
                                {!isEditingBadgeName ? (
                                    <>
                                        <h3 className="text-xl font-bold text-foreground">Has ganado el badge "{badgeName}"</h3>
                                        <Button variant="ghost" size="icon" onClick={handleEditBadgeName} className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Pencil size={16} />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                                      <Input value={tempBadgeName} onChange={(e) => setTempBadgeName(e.target.value)} className="h-9" />
                                      <Button size="icon" className="h-9 w-9" onClick={handleSaveBadgeName}><Save size={16} /></Button>
                                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsEditingBadgeName(false)}><X size={16} /></Button>
                                    </div>
                                )}
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">por completar tu pre-embarque.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Button onClick={() => toast({ title: "🚧 Próximamente", description: "La galería de insignias estará disponible pronto." })}>
                                <Medal size={16} className="mr-2" />
                                Ver mis insignias
                            </Button>
                            <Button variant="outline" onClick={handleShare}>
                                <Linkedin size={16} className="mr-2" />
                                Compartir en LinkedIn
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="p-3 bg-slate-200 rounded-full text-slate-500 mb-4">
                           <Lock size={24} />
                        </div>
                        <h3 className="font-semibold text-foreground">Este premio está bloqueado</h3>
                        <p className="text-muted-foreground text-sm mt-1 mb-4">Completa las siguientes actividades para desbloquear tu insignia:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {!isQuizCompleted && (
                                <Button size="sm" variant="outline" onClick={() => document.getElementById('quiz-button')?.focus()}>
                                    <CheckSquare size={16} className="mr-2" />
                                    Ir al Quiz de Ambientación
                                </Button>
                            )}
                            {!isAssignmentCompleted && (
                                <Button size="sm" variant="outline" onClick={() => navigate('/asignacion-tripulacion')}>
                                    <UserCheck size={16} className="mr-2" />
                                    Asignar mi Tripulación
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>
    );
};

export default PremioInicio;