import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex flex-col items-center"
      >
        <Frown className="w-24 h-24 text-primary mb-4" />
        <h1 className="text-6xl md:text-9xl font-extrabold text-primary tracking-wider">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-foreground mt-4 mb-2">Página No Encontrada</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          ¡Ups! Parece que te has desviado del camino. La página que buscas no existe o ha sido movida.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Volver al Inicio
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;