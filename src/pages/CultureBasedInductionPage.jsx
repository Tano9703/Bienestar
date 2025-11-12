import React from 'react';
import { motion } from 'framer-motion';
import WelcomePortal from '@/components/culture-onboarding/WelcomePortal';
import DigitalKit from '@/components/culture-onboarding/DigitalKit';
import PreparationDashboard from '@/components/culture-onboarding/PreparationDashboard';
import Seo from '@/components/Seo';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const CultureBasedInductionPage = () => {
  return (
    <>
      <Seo 
        title="Culture-Based Induction" 
        description="Welcome to your personalized onboarding journey at CrossLearning." 
        path="/culture-onboarding"
      />
      <div className="min-h-screen bg-brand-light-gray">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-brand-deep-indigo tracking-tight">Culture-Based Induction</h1>
            <p className="text-brand-charcoal mt-1">Your personalized onboarding experience starts now.</p>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <WelcomePortal />
            <DigitalKit />
            <PreparationDashboard />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CultureBasedInductionPage;