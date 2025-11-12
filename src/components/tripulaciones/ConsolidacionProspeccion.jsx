import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Award, ClipboardCheck, Lightbulb, GraduationCap, Sparkles, FolderKanban, CheckCircle, Target, Pencil, Plus, Save } from 'lucide-react';
import Confetti from 'react-confetti';
import { Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Input } from '@/components/ui/input';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

const getStoredData = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return defaultValue;
  }
};

const StatCard = ({ icon: Icon, title, value, total, color }) => (
  <Card className="flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="text-2xl font-bold">{value}{total && <span className="text-base font-normal text-muted-foreground">/{total}</span>}</div>
    </CardContent>
  </Card>
);

const ConsolidadoSection = ({ data }) => (
  <div className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={Trophy} title="Puntos Totales" value={data.points} color="text-amber-500" />
      <StatCard icon={Award} title="Insignias Ganadas" value={data.badgesUnlocked} total={data.totalBadges} color="text-blue-500" />
      <StatCard icon={ClipboardCheck} title="Tareas Completadas" value={data.completedTasks} total={data.totalTasks} color="text-green-500" />
      <StatCard icon={Lightbulb} title="Ideas/Votos" value={`${data.totalIdeas}/${data.totalVotes}`} color="text-purple-500" />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Desarrollo de Competencias (Aventura ABC)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <Radar data={{
            labels: data.abcDimensions,
            datasets: [{
              label: 'Progreso',
              data: data.abcScores,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
            }]
          }} options={{ maintainAspectRatio: false, scales: { r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: 100 } } }} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Desglose de Tareas</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex justify-center items-center">
          <Doughnut data={{
            labels: ['Completadas', 'Pendientes'],
            datasets: [{
              data: [data.completedTasks, data.totalTasks - data.completedTasks],
              backgroundColor: ['#10B981', '#F59E0B'],
            }]
          }} options={{ maintainAspectRatio: false }} />
        </CardContent>
      </Card>
    </div>
  </div>
);

const CeremoniaSection = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const handleCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 text-center">
        <CardContent className="p-6">
          <GraduationCap className="mx-auto h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">Certificado de Finalización</h3>
          <p className="text-muted-foreground mt-2">Otorgado a</p>
          <p className="text-2xl font-serif text-primary my-1">Tripulante Veterano</p>
          <p className="text-muted-foreground">Por completar exitosamente la Experiencia de Onboarding "Tripulaciones".</p>
          <div className="flex justify-center items-center gap-2 mt-4">
              <Award className="h-5 w-5 text-amber-500" />
              <p className="font-semibold">Insignia "Veterano de Tripulación" Obtenida</p>
          </div>
          <p className="text-xs mt-4 text-muted-foreground">{new Date().toLocaleDateString('es-ES', { dateStyle: 'long' })}</p>
          <Button onClick={handleCelebration} className="mt-6">
            <Sparkles className="mr-2 h-4 w-4" /> ¡Celebrar Logro!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const RoadmapSection = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    useEffect(() => {
        const storedGoals = getStoredData('roadmapGoals', ["Dominar nueva herramienta X", "Liderar un mini-proyecto", "Ser mentor de un nuevo tripulante"]);
        setGoals(storedGoals);
    }, []);

    const saveGoals = (newGoals) => {
        setGoals(newGoals);
        localStorage.setItem('roadmapGoals', JSON.stringify(newGoals));
    };

    const addGoal = () => {
        if(newGoal.trim() === '') return;
        saveGoals([...goals, newGoal]);
        setNewGoal('');
    };

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center"><Target className="mr-2 h-5 w-5" /> Plan de Desarrollo Individual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {goals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <p className="text-sm flex-grow">{goal}</p>
                        </div>
                    ))}
                     <div className="flex gap-2 pt-2">
                        <Input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Añadir nuevo objetivo..." />
                        <Button onClick={addGoal} size="icon"><Plus className="h-4 w-4" /></Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center"><FolderKanban className="mr-2 h-5 w-5" /> Módulos Avanzados Desbloqueados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="p-2 bg-green-100/50 text-green-700 text-sm rounded-md">Liderazgo de Proyectos Ágiles</p>
                    <p className="p-2 bg-green-100/50 text-green-700 text-sm rounded-md">Mentoría y Coaching 101</p>
                    <p className="p-2 bg-green-100/50 text-green-700 text-sm rounded-md">Innovación y Design Thinking</p>
                </CardContent>
            </Card>
        </div>
    );
};


const ConsolidacionProspeccion = ({ details }) => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const points = parseInt(localStorage.getItem('userPoints') || '0', 10);
    const badges = getStoredData('userBadges', []);
    const manualChallenges = getStoredData('manualDelMarChallenges', []);
    const missionTasks = getStoredData('missionTasks', []);
    const innovationIdeas = getStoredData('innovationIdeas', []);
    const abcTasks = getStoredData('abcAdventureTasks', []);

    const badgesUnlocked = badges.filter(b => b.unlocked).length;
    const manualCompleted = manualChallenges.filter(c => c.status === 'completed').length;
    const missionCompleted = missionTasks.filter(t => t.completed).length;
    const totalIdeas = innovationIdeas.length;
    const totalVotes = innovationIdeas.reduce((sum, idea) => sum + idea.votes, 0);

    const abcDimensions = ['Conocimiento', 'Indagación', 'Colaboración', 'Discusión', 'Práctica', 'Producción'];
    const abcScores = abcDimensions.map(dim => {
      const tasksInDim = abcTasks.filter(t => t.dimension === dim);
      const totalScore = tasksInDim.reduce((sum, task) => sum + (task.rating || 0), 0);
      const maxScore = tasksInDim.length * 5;
      return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    });

    const totalTasks = manualChallenges.length + missionTasks.length;
    const completedTasks = manualCompleted + missionCompleted;

    setSummaryData({
      points,
      badgesUnlocked,
      totalBadges: badges.length,
      completedTasks,
      totalTasks,
      totalIdeas,
      totalVotes,
      abcScores,
      abcDimensions,
    });
  }, []);

  const renderSection = (detailId) => {
    if (!summaryData) return <div className="p-4 text-center">Cargando resumen...</div>;
    
    switch (detailId) {
      case 'consolidado':
        return <ConsolidadoSection data={summaryData} />;
      case 'ceremonia':
        return <CeremoniaSection />;
      case 'roadmap':
        return <RoadmapSection />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <motion.div
            key={detail.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-background rounded-md border"
        >
            <h4 className="font-semibold text-foreground text-lg mb-2">{detail.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{detail.description}</p>
            {renderSection(detail.id)}
        </motion.div>
      ))}
    </div>
  );
};

export default ConsolidacionProspeccion;