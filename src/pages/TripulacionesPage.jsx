import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { phasesData } from '@/data/tripulacionesData';
import TripulacionesSidebar from '@/components/tripulaciones/TripulacionesSidebar';
import PhaseDetailCard from '@/components/tripulaciones/PhaseDetailCard';
import RecommendationsCard from '@/components/tripulaciones/RecommendationsCard';

const TripulacionesPage = () => {
  const navigate = useNavigate();
  const [selectedPhase, setSelectedPhase] = useState(phasesData[0]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSelectPhase = (phase) => {
    setSelectedPhase(phase);
    setShowRecommendations(false);
  };

  const handleShowRecommendations = () => {
    setSelectedPhase(null);
    setShowRecommendations(true);
  }

  const renderContent = () => {
    if (showRecommendations) {
      return <RecommendationsCard />;
    }
    if (selectedPhase) {
      return <PhaseDetailCard phase={selectedPhase} />;
    }
    return (
      <div className="h-full flex flex-col items-center justify-center text-center bg-card p-8 rounded-lg shadow-md border">
        <Info size={48} className="text-primary mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Bienvenido a Tripulaciones</h2>
        <p className="text-muted-foreground mt-2">Selecciona una fase de la izquierda para ver los detalles o revisa las recomendaciones de implementación.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-secondary text-secondary-foreground p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Ship size={28} className="mr-3 text-primary" />
            <h1 className="text-xl font-bold">Experiencia “Tripulaciones”</h1>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground bg-primary/80 text-xs"
            size="sm"
          >
            <Home size={16} className="mr-1.5" />
            Inicio
          </Button>
        </div>
      </header>

      <div className="flex-grow container mx-auto py-6 px-2 sm:px-4">
        <div className="md:grid md:grid-cols-12 md:gap-6 h-full">
          <TripulacionesSidebar 
            selectedPhase={selectedPhase}
            showRecommendations={showRecommendations}
            onSelectPhase={handleSelectPhase}
            onShowRecommendations={handleShowRecommendations}
          />
          <main className="md:col-span-9">
            <motion.div
              key={selectedPhase?.phaseNumber || (showRecommendations ? 'recommendations' : 'empty')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TripulacionesPage;