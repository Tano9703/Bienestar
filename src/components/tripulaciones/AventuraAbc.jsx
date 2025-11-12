import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const AventuraAbcLaunch = ({ description }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="p-6 rounded-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800 flex flex-col items-center text-center gap-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Rocket className="w-12 h-12 text-primary animate-pulse" />
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">Módulo Interactivo: Aventura ABC</h3>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      <Button 
        onClick={() => navigate('/aventura-abc')} 
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
        size="lg"
      >
        <span className="mr-2">🔹</span> Iniciar Aventura
      </Button>
    </motion.div>
  );
};

export default AventuraAbcLaunch;