import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BienvenidaNarrativa from './BienvenidaNarrativa';
import AsignacionTripulacion from './AsignacionTripulacion';
import PremioInicio from './PremioInicio';
import ManualDelMar from './ManualDelMar';
import Gamificacion from './Gamificacion';
import AventuraAbc from './AventuraAbc';
import TeamWall from './TeamWall';
import AsignacionTareas from './AsignacionTareas';
import SoporteTutoria from './SoporteTutoria';
import CompartirRealidad from './CompartirRealidad';
import AccionInnovacion from './AccionInnovacion';
import ConsolidacionProspeccion from './ConsolidacionProspeccion';

const PhaseDetailCard = ({ phase }) => {
  if (!phase) return null;

  const IconComponent = phase.icon;

  const renderDetailContent = (detail) => {
    switch (detail.id) {
      case 'bienvenida':
        return <BienvenidaNarrativa />;
      case 'asignacion':
        return <AsignacionTripulacion description={detail.description} />;
      case 'premio':
        return <PremioInicio />;
      case 'manual':
        return <ManualDelMar challenges={detail.challenges} />;
      case 'gamificacion':
        return <Gamificacion />;
      case 'aventura':
        return <AventuraAbc description={detail.description} />;
      case 'mecanicas':
        return (
          <>
            <p className="text-sm text-muted-foreground mb-4">{detail.description}</p>
            <TeamWall />
          </>
        );
      case 'tareas':
        return <AsignacionTareas description={detail.description} />;
      case 'soporte':
        return <SoporteTutoria description={detail.description} />;
      case 'feedback':
        return <CompartirRealidad description={detail.description} />;
      case 'innovacion':
        return <AccionInnovacion description={detail.description} />;
      default:
        return <p className="text-sm text-muted-foreground">{detail.description}</p>;
    }
  };

  const filteredDetails = phase.details.filter(item => item.id !== 'reglamento');

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <IconComponent size={28} className="mr-3" />
            {phase.title}
          </CardTitle>
          <span className="text-sm font-medium text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">{phase.week}</span>
        </div>
        <p className="text-md text-muted-foreground italic pt-2">{phase.objective}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {phase.phaseNumber === "6" ? (
          <ConsolidacionProspeccion details={filteredDetails} />
        ) : (
          filteredDetails.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-background rounded-md border"
            >
              <h4 className="font-semibold text-foreground text-lg mb-2">{item.title}</h4>
              {renderDetailContent(item)}
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PhaseDetailCard;