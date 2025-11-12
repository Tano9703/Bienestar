import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookUser, ChevronRight, Users, FileText, ShieldCheck } from 'lucide-react';
import IntroPolíticasContent from '@/components/poc/IntroPolíticasContent';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Seo from '@/components/Seo';

const modules = [
  { id: 'intro-politicas', name: 'Intro Políticas', icon: FileText },
  { id: 'deberes-y-derechos', name: 'Deberes y Derechos', icon: BookUser },
  { id: 'estructura-organizacional', name: 'Estructura Organizacional', icon: Users },
];

const ModuleContent = ({ module, onNavigate }) => {
  const { toast } = useToast();

  const handleComingSoon = () => {
    toast({
      title: "🚧 ¡Próximamente!",
      description: "Este módulo está en construcción. ¡Vuelve pronto para más novedades!",
    });
  };

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <LayoutDashboard className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-700">Bienvenido al Módulo POC</h2>
        <p className="mt-2 text-gray-500">Selecciona un módulo del menú de la izquierda para comenzar.</p>
      </div>
    );
  }

  if (module.id === 'intro-politicas') {
    return <IntroPolíticasContent />;
  }
  
  if (module.id === 'estructura-organizacional') {
    onNavigate('/estructura-organizacional');
    return null; 
  }

  if (module.id === 'deberes-y-derechos') {
    return (
      <div className="p-8 space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center mb-2">
            <BookUser className="w-7 h-7 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-blue-600">Deberes y Derechos</h2>
          </div>
          <p className="text-gray-500 italic mb-4">Conoce tus deberes y derechos como colaborador.</p>
          <p className="text-gray-700 mb-6">
            Este módulo establece las pautas de conducta, derechos y deberes de todos los colaboradores. Su comprensión es fundamental.
          </p>
          <Button onClick={() => onNavigate('/deberes-y-derechos')}>
            Conozca Reglamentos y Normativas <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center mb-2">
            <ShieldCheck className="w-7 h-7 text-green-500 mr-3" />
            <h2 className="2xl font-bold text-green-600">Encuesta de Condiciones Psicosociales de Entrada</h2>
          </div>
          <p className="text-gray-500 italic mb-4">Tu bienestar es nuestra prioridad.</p>
          <p className="text-gray-700 mb-6">
            Estimado(a) colaborador(a), como parte de nuestro compromiso con tu bienestar y en cumplimiento de la normativa colombiana vigente, te invitamos a diligenciar el primer instrumento de la Batería de Evaluación de Factores de Riesgo Psicosocial.
          </p>
          <Button onClick={handleComingSoon}>
            Diligenciar el Instrumento <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <module.icon className="w-16 h-16 mb-4 text-gray-300" />
      <h2 className="text-2xl font-bold text-gray-700">{module.name}</h2>
      <p className="mt-2 text-gray-500">Contenido en construcción. ¡Vuelve pronto!</p>
    </div>
  );
};

const PocPage = () => {
  const [selectedModuleId, setSelectedModuleId] = useState('intro-politicas');
  const navigate = useNavigate();

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'estructura-organizacional') {
      navigate('/estructura-organizacional');
    } else {
      setSelectedModuleId(moduleId);
    }
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId);

  return (
    <>
      <Seo title="POC" description="Prueba de concepto de CrossLearning: evalúa y valida soluciones de aprendizaje inteligente." path="/poc" image="/social/poc.jpg" />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-gray-100">
        <aside className="w-full md:w-64 bg-white p-4 md:p-6 border-r border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Módulos de Pre-Ingreso</h1>
          <nav>
            <ul>
              {modules.map(module => (
                <li key={module.id}>
                  <button
                    onClick={() => handleSelectModule(module.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      selectedModuleId === module.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <module.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{module.name}</span>
                    {selectedModuleId === module.id && <ChevronRight className="w-5 h-5 ml-auto" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModuleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm h-full"
            >
              <ModuleContent module={selectedModule} onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default PocPage;