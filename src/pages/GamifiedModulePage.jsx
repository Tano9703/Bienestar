import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Users, BarChart2, Briefcase, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExpectationsSurveyModal from '@/components/onboarding/ExpectationsSurveyModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

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

const SectionCard = ({ icon, title, description, children }) => (
  <motion.div variants={itemVariants}>
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg">
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const GamifiedModulePage = () => {
  const navigate = useNavigate();
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  const handleSurveySubmit = (data) => {
    console.log("Survey Data:", data);
    // Here you would typically save the data to a backend or state management solution
    setIsSurveyOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-background shadow-sm sticky top-0 z-10">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Award className="w-7 h-7" />
              Módulos Gamificados
            </h1>
            <Button variant="outline" onClick={() => navigate('/landing-onboarding')}>
              Volver al Onboarding
            </Button>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionCard
              icon={<Award />}
              title="Sección 1: WIIFM"
              description="What's In It For Me?"
            >
              <p className="text-sm text-muted-foreground">
                Descubre cómo este viaje potenciará tus habilidades, te conectará con líderes y acelerará tu carrera. ¡Tu crecimiento es nuestra misión!
              </p>
              <Button variant="link" className="px-0 mt-2" onClick={() => setIsSurveyOpen(true)}>
                Comparte tus expectativas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </SectionCard>

            <SectionCard
              icon={<Users />}
              title="Sección 2: Agentes de Aceleración"
              description="Conoce a tus guías"
            >
              <p className="text-sm text-muted-foreground">
                Tu Capitán (mentor), la comunidad de práctica y los recursos clave están aquí para asegurar tu éxito. No estás solo en esta aventura.
              </p>
              <Button variant="link" className="px-0 mt-2">Conocer a mi equipo <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </SectionCard>

            <SectionCard
              icon={<BarChart2 />}
              title="Sección 3: Tablero de Progresos"
              description="Tu bitácora de viaje"
            >
              <div className="space-y-3">
                  <div>
                      <div className="flex justify-between text-sm font-medium mb-1"><span>Módulos Completados</span><span>3/10</span></div>
                      <Progress value={30} />
                  </div>
                  <div>
                      <div className="flex justify-between text-sm font-medium mb-1"><span>Competencias Adquiridas</span><span>5/12</span></div>
                      <Progress value={42} />
                  </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Briefcase />}
              title="Sección 4: Exploración de Roles"
              description="Descubre tu próximo destino"
            >
              <p className="text-sm text-muted-foreground">
                Explora diferentes roles y trayectorias profesionales dentro de la organización. Tu próximo gran reto podría estar a un clic de distancia.
              </p>
              <Button variant="link" className="px-0 mt-2">Explorar roles <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </SectionCard>

            <SectionCard
              icon={<Trophy />}
              title="Proyecto Final"
              description="Aplica lo aprendido"
            >
              <p className="text-sm text-muted-foreground">
                Es hora de tomar el timón. Aplica tus nuevos conocimientos en un proyecto real que generará un impacto tangible en la organización.
              </p>
              <Button variant="link" className="px-0 mt-2">Ver detalles del proyecto <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </SectionCard>
          </motion.div>
        </main>
      </div>
      <ExpectationsSurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        onSubmit={handleSurveySubmit}
      />
    </>
  );
};

export default GamifiedModulePage;