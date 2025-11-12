import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { recommendationsData } from '@/data/tripulacionesData';

const RecommendationsCard = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <Settings size={28} className="mr-3" />
          Recomendaciones de Implementación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {recommendationsData.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start p-4 bg-background rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-primary/10 rounded-full mr-4 text-primary">
                <IconComponent size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">{rec.title}</h4>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;