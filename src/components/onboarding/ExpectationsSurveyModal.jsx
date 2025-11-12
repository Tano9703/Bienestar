import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const interestCategories = [
  { code: 'I1', category: 'Conocimiento de Procesos', description: 'Comprensión de flujos, protocolos y herramientas internas' },
  { code: 'I2', category: 'Integración Cultural', description: 'Familiaridad con valores, misión, equipo y cultura organizacional' },
  { code: 'I3', category: 'Habilidades Técnicas', description: 'Dominio de software, sistemas y herramientas específicas' },
  { code: 'I4', category: 'Redes y Colaboración', description: 'Oportunidades para conectar con colegas y mentores' },
  { code: 'I5', category: 'Crecimiento Profesional', description: 'Claridad sobre carrera, certificaciones y avance en la empresa' },
  { code: 'I6', category: 'Autonomía y Responsabilidad', description: 'Nivel de independencia y claridad en roles y expectativas' },
];

const RatingScale = ({ value, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-muted-foreground">Nada</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rate) => (
        <button
          key={rate}
          type="button"
          onClick={() => onChange(rate)}
          className={`w-7 h-7 rounded-full text-sm transition-all duration-200 ${
            value === rate ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted hover:bg-primary/20'
          }`}
        >
          {rate}
        </button>
      ))}
    </div>
    <span className="text-xs text-muted-foreground">Crucial</span>
  </div>
);

const ExpectationsSurveyModal = ({ isOpen, onClose, onSubmit }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [importanceRatings, setImportanceRatings] = useState({});
  const [top3, setTop3] = useState([]);
  const [openExpectations, setOpenExpectations] = useState({});

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setImportanceRatings({});
      setTop3([]);
      setOpenExpectations({});
    }
  }, [isOpen]);

  const handleRatingChange = (code, value) => {
    setImportanceRatings(prev => ({ ...prev, [code]: value }));
  };

  const handleTop3Change = (code) => {
    setTop3(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      }
      if (prev.length < 3) {
        return [...prev, code];
      }
      return prev;
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (Object.keys(importanceRatings).length !== interestCategories.length) {
        toast({ variant: "destructive", title: "Por favor, califica todas las categorías." });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (top3.length !== 3) {
        toast({ variant: "destructive", title: "Debes seleccionar exactamente 3 categorías." });
        return;
      }
      setStep(3);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const top3Expectations = top3.every(code => openExpectations[code]?.trim());
    if (!top3Expectations) {
        toast({ variant: "destructive", title: "Por favor, completa tus expectativas para el Top 3." });
        return;
    }
    
    onSubmit({
      importanceRatings,
      top3,
      openExpectations,
    });
    toast({ title: "¡Gracias!", description: "Tus expectativas han sido guardadas." });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">1. Califica la Importancia</h3>
            <p className="text-sm text-muted-foreground">Para cada categoría, califica su importancia en tu desarrollo (1=Nada importante, 5=Crucial).</p>
            <div className="space-y-6">
              {interestCategories.map(({ code, category, description }) => (
                <div key={code}>
                  <Label className="font-medium">{category}</Label>
                  <p className="text-xs text-muted-foreground mb-2">{description}</p>
                  <RatingScale value={importanceRatings[code]} onChange={(value) => handleRatingChange(code, value)} />
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">2. Selecciona tu Top 3</h3>
            <p className="text-sm text-muted-foreground">Selecciona las 3 categorías más importantes para ti.</p>
            <div className="space-y-2">
              {interestCategories.map(({ code, category }) => (
                <div key={code} className="flex items-center space-x-3 p-3 rounded-lg border has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                  <Checkbox
                    id={code}
                    checked={top3.includes(code)}
                    onCheckedChange={() => handleTop3Change(code)}
                    disabled={!top3.includes(code) && top3.length >= 3}
                  />
                  <Label htmlFor={code} className="font-medium cursor-pointer flex-grow">{category}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">3. Describe tus Expectativas</h3>
            <p className="text-sm text-muted-foreground">En tus propias palabras, ¿qué esperas lograr en tus 3 áreas prioritarias?</p>
            <div className="space-y-4">
              {top3.map(code => {
                const category = interestCategories.find(c => c.code === code);
                return (
                  <div key={code}>
                    <Label htmlFor={`exp-${code}`} className="font-medium">{category.category}</Label>
                    <Textarea
                      id={`exp-${code}`}
                      placeholder="Escribe aquí tus expectativas..."
                      value={openExpectations[code] || ''}
                      onChange={(e) => setOpenExpectations(prev => ({ ...prev, [code]: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mapeo de Intereses y Expectativas (Ex-Ante)</DialogTitle>
          <DialogDescription>Ayúdanos a personalizar tu experiencia de onboarding.</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6 -mr-6 pl-1 -ml-1 py-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStepContent()}
                </motion.div>
            </AnimatePresence>
        </div>
        <DialogFooter className="pt-4 border-t">
          {step > 1 && <Button variant="ghost" onClick={handleBackStep}>Atrás</Button>}
          {step < 3 ? (
            <Button onClick={handleNextStep}>Siguiente</Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Enviar Encuesta
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpectationsSurveyModal;