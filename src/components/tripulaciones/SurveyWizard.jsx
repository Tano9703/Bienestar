import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, ArrowRight, User, Shield, Heart, Lightbulb, UserCheck, ThumbsUp, Sparkles, Send 
} from 'lucide-react';

const steps = [
  {
    id: 'jobs',
    title: 'Paso 1: Tus Fortalezas (Jobs)',
    question: '¿En qué te destacas como parte de una tripulación?',
    icon: User,
    options: [
      "Comunicación efectiva",
      "Organización",
      "Resolución de conflictos",
      "Habilidad técnica",
      "Liderazgo",
    ],
    type: 'multiselect',
  },
  {
    id: 'pains',
    title: 'Paso 2: Tus Obstáculos (Pains)',
    question: '¿Qué suele ser un desafío para ti al colaborar?',
    icon: Shield,
    options: [
      "Ambigüedad de roles",
      "Falta de estructura",
      "Baja motivación",
      "Comunicación débil",
    ],
    type: 'checkbox',
  },
  {
    id: 'gains',
    title: 'Paso 3: Tus Motivaciones (Gains)',
    question: '¿Qué esperas ganar en este viaje?',
    icon: Heart,
    options: [
      { text: "Aprender algo nuevo", icon: Lightbulb },
      { text: "Conexión auténtica", icon: UserCheck },
      { text: "Superar un reto", icon: ThumbsUp },
      { text: "Logros visibles", icon: Sparkles },
    ],
    type: 'buttons',
  },
];

const SurveyWizard = ({ onComplete, initialData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(initialData || {});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };
  
  const handleMultiSelectChange = (option) => {
    const currentAnswers = answers[steps[currentStep].id]?.options || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    setAnswers({ ...answers, [steps[currentStep].id]: { ...answers[steps[currentStep].id], options: newAnswers } });
  };
  
  const handleCheckboxChange = (option) => {
    handleMultiSelectChange(option);
  };

  const handleButtonSelect = (option) => {
    setAnswers({ ...answers, [steps[currentStep].id]: { options: [option] } });
  };
  
  const handleOtherTextChange = (e) => {
    setAnswers({ ...answers, [steps[currentStep].id]: { ...answers[steps[currentStep].id], other: e.target.value } });
  };
  
  const step = steps[currentStep];
  const IconComponent = step.icon;

  const renderOptions = () => {
    const selectedOptions = answers[step.id]?.options || [];

    switch(step.type) {
      case 'multiselect':
      case 'checkbox':
        return (
          <div className="space-y-3">
            {step.options.map(option => (
              <div key={option} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-white/30">
                <Checkbox
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => handleCheckboxChange(option)}
                />
                <Label htmlFor={option} className="text-base font-normal cursor-pointer">{option}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-white/30">
              <Checkbox
                id="other"
                checked={selectedOptions.includes('Otro')}
                onCheckedChange={() => handleCheckboxChange('Otro')}
              />
              <Label htmlFor="other" className="text-base font-normal cursor-pointer">Otro</Label>
              {selectedOptions.includes('Otro') && (
                <Input 
                  type="text" 
                  placeholder="Por favor, especifica"
                  className="ml-4 flex-grow bg-transparent border-b-2 border-primary focus:ring-0"
                  value={answers[step.id]?.other || ''}
                  onChange={handleOtherTextChange}
                />
              )}
            </div>
          </div>
        );
      case 'buttons':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {step.options.map(option => {
              const OptionIcon = option.icon;
              return (
                <Button
                  key={option.text}
                  variant={selectedOptions.includes(option.text) ? 'default' : 'outline'}
                  className="h-auto py-4 text-base flex flex-col gap-2 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonSelect(option.text)}
                >
                  <OptionIcon size={24} />
                  <span>{option.text}</span>
                </Button>
              )
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <div className="mb-6">
        <Progress value={progressValue} className="w-full h-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Paso {currentStep + 1} de {steps.length}</span>
          <span>{step.title}</span>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-primary/20 text-primary rounded-full mb-3">
              <IconComponent size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">{step.question}</h2>
          </div>
          <div className="space-y-4">
            {renderOptions()}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between items-center">
        <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>
            Siguiente <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Finalizar y Enviar <Send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SurveyWizard;