import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Home, Edit, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SurveyWizard from '@/components/tripulaciones/SurveyWizard';
import SurveyResultCard from '@/components/tripulaciones/SurveyResultCard';

const AsignacionTripulacionPage = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const storedCompletion = localStorage.getItem('surveyCompleted');
    const storedData = localStorage.getItem('surveyData');
    if (storedCompletion === 'true' && storedData) {
      setIsCompleted(true);
      setSurveyData(JSON.parse(storedData));
    }
  }, []);

  const handleSurveyComplete = (data) => {
    const assignment = {
      ...data,
      shipName: 'El Intrépido',
      captainName: 'Alex Ryder',
    };
    setSurveyData(assignment);
    setIsCompleted(true);
    localStorage.setItem('surveyCompleted', 'true');
    localStorage.setItem('surveyData', JSON.stringify(assignment));
  };

  const handleEdit = () => {
    setIsCompleted(false);
  };
  
  const handleReset = () => {
    localStorage.removeItem('surveyCompleted');
    localStorage.removeItem('surveyData');
    setIsCompleted(false);
    setSurveyData(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 text-gray-800 flex flex-col p-4">
      <header className="container mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-primary">
          <Ship size={32} />
          <h1 className="text-2xl font-bold">Asignación de Tripulación</h1>
        </div>
        <div className='flex gap-2'>
         {isCompleted && (
            <Button onClick={handleReset} variant="destructive" size="sm">
              <RotateCcw size={16} className="mr-2" />
              Reiniciar
            </Button>
          )}
          <Button onClick={() => navigate('/tripulaciones')} variant="outline" size="sm">
            <Home size={16} className="mr-2" />
            Volver a Fases
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {isCompleted && surveyData ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <SurveyResultCard
                  shipName={surveyData.shipName}
                  captainName={surveyData.captainName}
                />
                <div className="text-center mt-6">
                  <Button onClick={handleEdit} variant="secondary">
                    <Edit size={16} className="mr-2" />
                    Editar mi Encuesta
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-2xl nautical-card overflow-hidden">
                  <CardContent className="p-8">
                    <SurveyWizard onComplete={handleSurveyComplete} initialData={surveyData} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AsignacionTripulacionPage;