import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Award, HelpCircle, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const OptionCard = ({ icon, title, description, buttonText, buttonIcon, colorClass, onClick }) => (
  <motion.div
    variants={itemVariants}
    className={`group relative p-4 rounded-lg border bg-background transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-${colorClass}`}
    onClick={onClick}
    aria-label={`Acceder a ${title}`}
  >
    <div className="flex items-start gap-4">
      {React.cloneElement(icon, { className: `w-6 h-6 text-${colorClass} flex-shrink-0` })}
      <div className="flex-grow">
        <h4 className={`font-bold text-md text-${colorClass}`}>{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
    <Button variant="outline" size="sm" className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-${colorClass}/10 border-${colorClass}/50 text-${colorClass} hover:bg-${colorClass}/20 hover:text-${colorClass}`}>
        {buttonText}
        {buttonIcon}
    </Button>
  </motion.div>
);

const DigitalKit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGamifiedClick = () => {
    navigate('/modulos-gamificados');
  };

  const handleOtherActions = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Esta característica estará disponible próximamente.",
    });
  };

  const options = [
    {
      icon: <Award />,
      title: "Módulos Gamificados",
      description: "Aprende sobre nuestra misión y valores de forma divertida.",
      buttonText: "Comenzar",
      buttonIcon: <ArrowRight className="w-4 h-4 ml-2" />,
      colorClass: "amber-500",
      action: handleGamifiedClick,
    },
    {
      icon: <HelpCircle />,
      title: "Quiz Interactivo",
      description: "¿Qué tanto conoces tu nueva empresa? ¡Ponte a prueba!",
      buttonText: "¡Jugar!",
      buttonIcon: null,
      colorClass: "green-500",
      action: handleOtherActions,
    },
    {
      icon: <Mic />,
      title: "Podcasts Internos",
      description: "Escucha a nuestros líderes compartir sus experiencias.",
      buttonText: "Escuchar",
      buttonIcon: null,
      colorClass: "red-500",
      action: handleOtherActions,
    },
  ];

  return (
    <motion.div variants={itemVariants}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-6">
          <div className="flex items-center gap-4">
            <Award className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Kit Digital del Nuevo Talento</CardTitle>
              <CardDescription>Equípate con todo lo que necesitas para tu viaje.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2 space-y-4">
          {options.map((opt) => (
            <OptionCard 
              key={opt.title}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              buttonText={opt.buttonText}
              buttonIcon={opt.buttonIcon}
              colorClass={opt.colorClass}
              onClick={opt.action}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DigitalKit;