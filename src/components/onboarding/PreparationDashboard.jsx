import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare, FileText, Calendar } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const PreparationDashboard = () => {
  const checklistItems = [
    { id: 'check1', label: 'Completar información de perfil' },
    { id: 'check2', label: 'Configurar equipo de cómputo' },
    { id: 'check3', label: 'Revisar el manual del empleado' },
  ];

  return (
    <motion.div variants={itemVariants}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
            <CheckSquare className="w-8 h-8" />
            Dashboard de Preparación
          </CardTitle>
          <CardDescription>Organiza tus primeros días y semanas con nosotros.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><CheckSquare className="w-5 h-5 text-primary" /> Checklist de Incorporación</h4>
            <div className="space-y-2">
              {checklistItems.map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox id={item.id} />
                  <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-primary" /> Documentos Esenciales</h4>
            <Button variant="outline" className="w-full">
              Acceder y Firmar Documentos
            </Button>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><Calendar className="w-5 h-5 text-primary" /> Calendario de Primeras Semanas</h4>
            <div className="p-4 bg-muted/50 rounded-lg text-sm">
              <p><strong>Lunes:</strong> Bienvenida y tour por las oficinas.</p>
              <p><strong>Martes:</strong> Reunión con tu equipo.</p>
              <p><strong>Miércoles:</strong> Capacitación de herramientas.</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PreparationDashboard;