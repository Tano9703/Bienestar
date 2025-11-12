import React from 'react';
import { Button } from '@/components/ui/button';
import { Folder, Settings, ChevronRight } from 'lucide-react';
import { phasesData } from '@/data/tripulacionesData';

const TripulacionesSidebar = ({ selectedPhase, showRecommendations, onSelectPhase, onShowRecommendations }) => {
  return (
    <aside className="md:col-span-3 bg-card p-4 rounded-lg shadow-md border mb-6 md:mb-0 h-full">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Folder size={20} className="mr-2 text-primary" />
        Aprendizaje por Retos
      </h2>
      <nav className="space-y-1">
        {phasesData.map((phase) => (
          <Button
            key={phase.phaseNumber}
            variant={selectedPhase?.phaseNumber === phase.phaseNumber && !showRecommendations ? "secondary" : "ghost"}
            className={`w-full justify-start items-center text-sm ${selectedPhase?.phaseNumber === phase.phaseNumber && !showRecommendations ? 'text-secondary-foreground font-semibold' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
            onClick={() => onSelectPhase(phase)}
          >
            <phase.icon size={16} className="mr-2.5 flex-shrink-0" />
            <span className="truncate">{phase.title} ({phase.week})</span>
            {selectedPhase?.phaseNumber === phase.phaseNumber && !showRecommendations && <ChevronRight size={16} className="ml-auto text-primary" />}
          </Button>
        ))}
        <Button
          variant={showRecommendations ? "secondary" : "ghost"}
          className={`w-full justify-start items-center text-sm mt-4 pt-2 border-t ${showRecommendations ? 'text-secondary-foreground font-semibold' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
          onClick={onShowRecommendations}
        >
          <Settings size={16} className="mr-2.5 flex-shrink-0" />
          <span className="truncate">Recomendaciones</span>
          {showRecommendations && <ChevronRight size={16} className="ml-auto text-primary" />}
        </Button>
      </nav>
    </aside>
  );
};

export default TripulacionesSidebar;