import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodTrackerContent from '@/components/bitacora/MoodTrackerContent';
import EntradasDeReflexion from '@/components/bitacora/EntradasDeReflexion';
import ObjetivosBienestarContent from '@/components/objetivos/ObjetivosBienestarContent';
import InsightsContent from '@/components/bitacora/InsightsContent';

export const BitacoraContent = ({ section, onEntrySubmit }) => {
  const renderSectionContent = () => {
    if (!section || !section.content) {
      return <p className="text-muted-foreground">Selecciona una sección para ver los detalles.</p>;
    }

    const { type, ...contentProps } = section.content;

    switch (type) {
      case "moodTracker":
        return <MoodTrackerContent contentProps={contentProps} onEntrySubmit={onEntrySubmit} />;
      case "journal":
        return <EntradasDeReflexion />;
      case "goalTracker":
        return <ObjetivosBienestarContent />;
      case "dashboard":
        return <InsightsContent />;
      case "settingsList":
        return (
          <div className="space-y-4">
            {contentProps.notifications && (
              <>
                <h4 className="font-semibold text-lg mb-2 text-primary">Notificaciones</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {contentProps.notifications.map(item => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
            {contentProps.integrations && (
              <>
                <h4 className="font-semibold text-lg mt-4 mb-2 text-primary">Integraciones</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {contentProps.integrations.map(item => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
            {contentProps.privacyOptions && (
              <>
                <h4 className="font-semibold text-lg mb-2 text-primary">Opciones de Privacidad</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {contentProps.privacyOptions.map(item => <li key={item}>{item}</li>)}
                </ul>
              </>
            )}
          </div>
        );
      default:
        return <p className="text-muted-foreground">Contenido no disponible para esta sección.</p>;
    }
  };

  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <CardHeader className="px-0 pt-0 pb-4 border-b border-border mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-primary/10 rounded-full mr-3">
            <section.icon size={24} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">{section.title}</CardTitle>
            <CardDescription className="text-md text-muted-foreground italic">{section.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {renderSectionContent()}
      </CardContent>
    </motion.div>
  );
};