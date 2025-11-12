import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChartHorizontal, Smile, Target, Flame, Award, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const InsightWidget = ({ icon: Icon, value, subdata, subdataColor, label, progress, onClick }) => {
  const widgetVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div variants={widgetVariants} onClick={onClick} className="cursor-pointer">
      <Card className="h-full flex flex-col justify-between p-4 bg-background hover:shadow-lg transition-shadow duration-300 hover:ring-2 hover:ring-primary">
        <div className="flex justify-between items-start">
          <p className="text-sm text-muted-foreground">{label}</p>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {progress !== undefined && <Progress value={progress} className="h-2 mt-2" indicatorClassName="bg-green-500" />}
          <p className={`text-xs font-semibold mt-1 ${subdataColor}`}>{subdata}</p>
        </div>
      </Card>
    </motion.div>
  );
};

const RecommendationItem = ({ icon: Icon, title, description, actionText, onClick }) => {
    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }
    };
    return (
        <motion.div variants={itemVariants} className="flex items-center space-x-4 p-3 bg-background rounded-lg border hover:bg-accent/50">
            <div className="p-3 bg-primary/10 rounded-full">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={onClick}>
                {actionText}
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </motion.div>
    )
};


export const InsightsContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCardClick = (insightType) => {
    const typeSlug = insightType.toLowerCase().replace(/ /g, '-');
    navigate(`/bitacora/insights/${typeSlug}`);
  };

  const handleRecommendationClick = (title) => {
    toast({
      title: `Recomendación: ${title}`,
      description: "🚧 ¡Esta función aún no está implementada, pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };
    
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    },
  };

  const insightsData = [
    { icon: Smile, value: "7.8/10", subdata: "↑ 0.5 vs. semana pasada", subdataColor: "text-green-600", label: "Promedio de ánimo" },
    { icon: Target, value: "5", subdata: "65% avance prom.", subdataColor: "text-muted-foreground", label: "Metas activas" },
    { icon: Flame, value: "12 días", subdata: "Mejor racha: 25 días", subdataColor: "text-muted-foreground", label: "Streaks de journaling" },
    { icon: Award, value: "82/100", subdata: "", subdataColor: "text-muted-foreground", label: "Score de Bienestar", progress: 82 },
  ];
  
  const recommendations = [
    { icon: Lightbulb, title: "Reflexión Sugerida", description: "Basado en tu última entrada, reflexiona sobre tus logros.", actionText: "Empezar" },
    { icon: Target, title: "Nueva Meta Recomendada", description: "Considera establecer una meta de 'Mindfulness' esta semana.", actionText: "Crear Meta" },
  ];

  return (
    <Card className="border-border shadow-md">
      <CardHeader>
        <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-full mr-3">
                <BarChartHorizontal className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="text-xl font-bold text-primary">Insights y Recomendaciones</CardTitle>
                <CardDescription>Obtén una visión clara de tu bienestar y consejos.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {insightsData.map((insight, index) => (
            <InsightWidget key={index} {...insight} onClick={() => handleCardClick(insight.label)} />
          ))}
        </motion.div>
        
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Recomendaciones Accionables</h3>
            <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {recommendations.map((rec, index) => (
                   <RecommendationItem key={index} {...rec} onClick={() => handleRecommendationClick(rec.title)} />
                ))}
            </motion.div>
        </div>

      </CardContent>
    </Card>
  );
};

export default InsightsContent;