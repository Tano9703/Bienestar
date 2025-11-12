import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WelcomePortal from '@/components/onboarding/WelcomePortal';
import DigitalKit from '@/components/onboarding/DigitalKit';
import PreparationDashboard from '@/components/onboarding/PreparationDashboard';
import TimelineModal from '@/components/onboarding/TimelineModal';
import SuccessStoryModal from '@/components/onboarding/SuccessStoryModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const initialTimelineEvents = [
    {
        title: 'Fundación',
        description: 'El comienzo de un gran viaje. Así zarpó nuestro barco.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
    },
    {
        title: 'Primer Gran Proyecto',
        description: 'Marcamos un antes y un después con nuestro primer éxito.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Expansión Global',
        description: 'Navegamos hacia nuevos horizontes y mercados.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: '¡Tu Llegada!',
        description: 'El capítulo más emocionante es el que escribiremos juntos.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-942bb68b2434?q=80&w=2070&auto=format&fit=crop',
    },
];

const initialSuccessStories = [
    { name: 'Ana', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { name: 'Carlos', videoUrl: 'https://www.youtube.com/embed/o-YBDTqX_ZU' },
    { name: 'Sofia', videoUrl: 'https://www.youtube.com/embed/3tmd-ClpJxA' },
];

const LandingOnboardingPage = () => {
  const [timelineEvents, setTimelineEvents] = useState(initialTimelineEvents);
  const [successStories, setSuccessStories] = useState(initialSuccessStories);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  
  const handleTimelineClick = (event, index) => {
    setSelectedEvent({ ...event, index });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleUpdateEvent = (index, updatedData) => {
    const newEvents = [...timelineEvents];
    newEvents[index] = { ...newEvents[index], ...updatedData };
    setTimelineEvents(newEvents);
  };

  const handleStoryClick = (story, index) => {
    setSelectedStory({ ...story, index });
  };

  const handleCloseStoryModal = () => {
    setSelectedStory(null);
  };

  const handleUpdateStory = (index, updatedData) => {
    const newStories = [...successStories];
    newStories[index] = { ...newStories[index], ...updatedData };
    setSuccessStories(newStories);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Landing de Onboarding</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <WelcomePortal 
            timelineEvents={timelineEvents} 
            successStories={successStories}
            onTimelineClick={handleTimelineClick}
            onStoryClick={handleStoryClick}
          />
          <DigitalKit />
          <PreparationDashboard />
        </motion.div>
      </main>
      <TimelineModal event={selectedEvent} isOpen={!!selectedEvent} onClose={handleCloseModal} onUpdate={handleUpdateEvent} />
      <SuccessStoryModal story={selectedStory} isOpen={!!selectedStory} onClose={handleCloseStoryModal} onUpdate={handleUpdateStory} />
    </div>
  );
};

export default LandingOnboardingPage;