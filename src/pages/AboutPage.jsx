import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, HelpCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    category: "Pre-inducción Digital",
    icon: <HelpCircle className="mr-2 text-blue-500" />,
    questions: [
      "¿Cómo accedo a los módulos de Normativa SST y Reglamento Interno antes de mi primer día?",
      "¿Es obligatorio completar la encuesta de riesgos psicosociales para poder firmar el contrato?",
      "¿Los datos de la debida diligencia en derechos humanos se comparten con otros departamentos?",
    ],
  },
  {
    category: "Inducción Cultural",
    icon: <HelpCircle className="mr-2 text-purple-500" />,
    questions: [
      "¿Qué diferencia hay entre “Pre-Onboarding” y los módulos de ADN y Cultura Organizacional?",
      "¿Cuánto tiempo tengo para completar el quiz y el foro de reflexión?",
      "¿Quién revisa y firma electrónicamente mi acta de feedback?",
    ],
  },
  {
    category: "Learning Experience Design (LXD)",
    icon: <HelpCircle className="mr-2 text-green-500" />,
    questions: [
      "¿Cómo arrastro y suelto actividades en el editor multimodal?",
      "¿Puedo reutilizar un recurso de la Biblioteca Dinámica en varios cursos?",
      "¿Cómo funcionan las rutas personalizadas basadas en mi desempeño?",
    ],
  },
  {
    category: "SME Workflow",
    icon: <HelpCircle className="mr-2 text-yellow-500" />,
    questions: [
      "¿Dónde defino mis “Jobs–Pains–Gains” y cómo recibe feedback mi mentor?",
      "¿Qué sucede si no completo mis OKR antes del fin del periodo de 3 meses?",
      "¿Cómo reviso el historial de versiones tras devolver un contenido con comentarios?",
    ],
  },
  {
    category: "GEP (Gamify Engagement Platform)",
    icon: <HelpCircle className="mr-2 text-red-500" />,
    questions: [
      "¿Qué son los ciclos TREE-Turnover y TREE-Climate?",
      "¿Cómo participo en la encuesta gamificada y accedo al heatmap de riesgos?",
      "¿Qué tipo de acciones puedo planear en la sesión de feedback trimestral?",
    ],
  },
  {
    category: "GKR (Growth & Key Results)",
    icon: <HelpCircle className="mr-2 text-indigo-500" />,
    questions: [
      "¿Cuál es la diferencia entre evaluación formativa y sumativa en el setup wizard?",
      "¿Cómo ajusto un umbral de puntaje mínimo para una dimensión con el slider circular?",
      "¿Dónde encuentro mis insignias al completar una evaluación?",
    ],
  },
  {
    category: "VRX (Virtual Reality Experience)",
    icon: <HelpCircle className="mr-2 text-pink-500" />,
    questions: [
      "¿Necesito un headset para probar la experiencia VR o puedo emularla en el navegador?",
      "¿Cómo funcionan los hotspots de quiz dentro de la escena 3D?",
      "¿Qué hago si quiero repetir el tutorial overlay de 30 segundos?",
    ],
  },
  {
    category: "CrossLearning – Actividades Interactivas",
    icon: <HelpCircle className="mr-2 text-teal-500" />,
    questions: [
      "¿En qué se diferencia un Nivel 2B de un Nivel 2C de interactividad?",
      "¿Puedo convertir un PowerPoint en una Píldora Formativa (Nivel 1B)?",
      "¿Cómo veo un ejemplo de cada nivel desde la galería de imágenes/videos?",
    ],
  },
];

const FaqSection = ({ category, questions, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden bg-white"
      layout
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-50 transition-colors duration-150 focus:outline-none"
      >
        <span className="flex items-center">
          {icon}
          {category}
        </span>
        {isOpen ? <ChevronDown size={24} className="text-blue-600" /> : <ChevronRight size={24} className="text-gray-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-4 md:px-6 pb-4 md:pb-6 pt-2 bg-gray-50"
          >
            <ul className="space-y-3">
              {questions.map((q, index) => (
                <li key={index}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4 whitespace-normal text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-150"
                    onClick={() => console.log(`Clicked: ${q}`)} 
                  >
                    <HelpCircle size={18} className="mr-3 text-gray-400 flex-shrink-0" />
                    {q}
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-gray-100 min-h-[calc(100vh-var(--header-height,0px)-var(--footer-height,0px))]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">Preguntas Frecuentes</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Resuelve tus dudas sobre nuestros 8 módulos
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {faqData.map((section, index) => (
          <FaqSection
            key={index}
            category={section.category}
            questions={section.questions}
            icon={section.icon}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-12 mb-8"
      >
        <Button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
        >
          <Home size={20} className="mr-2" />
          Regresar al Inicio
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutPage;