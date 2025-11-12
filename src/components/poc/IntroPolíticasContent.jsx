import React from 'react';
import { motion } from 'framer-motion';
import CursoCard from '@/components/poc/CursoCard';

const cursos = [
  {
    id: 'sig',
    title: 'Introducción SIG',
    description: 'Qué es el Sistema Integrado de Gestión?',
    progress: 60,
    imageDescription: 'Hands holding colorful gears connecting with each other',
  },
  {
    id: 'hseq',
    title: 'Principios en HSEQ',
    description: 'Qué es seguridad y salud en el trabajo?',
    progress: 40,
    imageDescription: 'Construction workers with hard hats reviewing a document',
  },
  {
    id: 'ambiental',
    title: 'Gestión Ambiental',
    description: 'Qué es la Gestión Ambiental?',
    progress: 80,
    imageDescription: 'Hands holding a small globe and a small tree',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const IntroPolíticasContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Catálogo Cursos Pre-Ingreso
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cursos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IntroPolíticasContent;