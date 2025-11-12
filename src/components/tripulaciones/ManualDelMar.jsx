import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ChallengeCard from './ChallengeCard';
import ChallengeDetailModal from './ChallengeDetailModal';

const ManualDelMar = ({ challenges: initialChallenges }) => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  
  useEffect(() => {
    try {
      const storedChallenges = localStorage.getItem('manualDelMarChallenges');
      if (storedChallenges) {
        const parsedChallenges = JSON.parse(storedChallenges);
        if (parsedChallenges.length > 0 && typeof parsedChallenges[0].icon === 'string') {
          setChallenges(parsedChallenges);
        } else {
          setChallenges(initialChallenges);
        }
      } else {
        setChallenges(initialChallenges);
      }
    } catch (error) {
      console.error("Failed to parse challenges from localStorage, resetting.", error);
      setChallenges(initialChallenges);
    }
  }, [initialChallenges]);

  useEffect(() => {
    if(challenges.length > 0) {
      localStorage.setItem('manualDelMarChallenges', JSON.stringify(challenges));
    }
  }, [challenges]);


  const handleSelectChallenge = (challenge) => {
    if (challenge.status === 'locked') {
      toast({
        variant: "destructive",
        title: "Reto Bloqueado",
        description: "Completa los retos anteriores para desbloquear este.",
      });
      return;
    }
    setSelectedChallenge(challenge);
  };

  const handleUpdateChallenge = (updatedChallenge) => {
    setChallenges(challenges.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
    toast({
      title: "✅ Reto Actualizado",
      description: `Se han guardado los cambios para "${updatedChallenge.title}".`,
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onSelect={handleSelectChallenge}
            index={index}
          />
        ))}
      </div>
      
      {selectedChallenge && (
        <ChallengeDetailModal
          isOpen={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          challenge={selectedChallenge}
          onUpdate={handleUpdateChallenge}
        />
      )}
    </>
  );
};

export default ManualDelMar;