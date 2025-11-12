import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smile, Target, Flame, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const insightDetails = {
  'promedio-de-ánimo': {
    title: 'Detalle de Promedio de Ánimo',
    icon: Smile,
    description: 'Aquí puedes ver un desglose detallado de tu estado de ánimo a lo largo del tiempo.',
    content: 'Gráficos y estadísticas sobre tu ánimo aparecerán aquí.'
  },
  'metas-activas': {
    title: 'Detalle de Metas Activas',
    icon: Target,
    description: 'Revisa el progreso de todas tus metas activas.',
    content: 'Una lista detallada de tus metas con su progreso individual se mostrará aquí.'
  },
  'streaks-de-journaling': {
    title: 'Detalle de Streaks de Journaling',
    icon: Flame,
    description: 'Analiza tus rachas de escritura y mantén la motivación.',
    content: 'Un calendario o historial de tus rachas de journaling estará disponible aquí.'
  },
  'score-de-bienestar': {
    title: 'Detalle de Score de Bienestar',
    icon: Award,
    description: 'Comprende cómo se calcula tu puntuación de bienestar y cómo puedes mejorarla.',
    content: 'Información detallada sobre los componentes de tu score de bienestar se presentará aquí.'
  }
};

const InsightDetailPage = () => {
  const { insightType } = useParams();
  const navigate = useNavigate();
  const details = insightDetails[insightType] || {
    title: 'Detalle no encontrado',
    icon: Award,
    description: 'No se encontró información para esta sección.',
    content: 'Por favor, vuelve a la página anterior.'
  };

  const Icon = details.icon;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button onClick={() => navigate('/bitacora')} variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la Bitácora
          </Button>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-primary">{details.title}</CardTitle>
                  <CardDescription>{details.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
                <p className="text-muted-foreground">{details.content}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  🚧 ¡Esta sección de detalles aún no está implementada, pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InsightDetailPage;