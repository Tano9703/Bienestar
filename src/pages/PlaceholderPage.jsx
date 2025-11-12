import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import Seo from '@/components/Seo';

    const PlaceholderPage = ({ title }) => {
      return (
        <>
          <Seo
            title={title}
            description={`Página de ${title} en construcción.`}
            noIndex={true}
          />
          <div className="flex flex-col items-center justify-center text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-brand-deep-indigo mb-4">{title}</h1>
              <p className="text-lg text-brand-charcoal mb-8">🚧 ¡Esta sección está en construcción! 🚧</p>
              <Button asChild>
                <Link to="/">Volver al Inicio</Link>
              </Button>
            </motion.div>
          </div>
        </>
      );
    };

    export default PlaceholderPage;