import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, User, Anchor } from 'lucide-react';

const SurveyResultCard = ({ shipName, captainName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <Card className="text-center shadow-xl nautical-card overflow-hidden">
        <CardHeader className="bg-primary/10 pb-4">
          <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-fit">
            <Rocket size={40} />
          </div>
          <CardTitle className="text-3xl font-bold text-primary pt-4">¡Todo listo!</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-lg text-gray-700 space-y-4">
          <p>
            Estás a bordo del <strong className="text-primary font-semibold">{shipName}</strong> bajo el mando del Cap. <strong className="text-primary font-semibold">{captainName}</strong>.
          </p>
          <p className="text-base text-muted-foreground">
            Gracias por compartir tus fortalezas. Pronto conocerás al resto de tu tripulación.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SurveyResultCard;