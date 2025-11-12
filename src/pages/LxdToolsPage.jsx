import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Save, X, Lightbulb, CheckSquare, Users, Target } from 'lucide-react';

const toolsData = [
  {
    id: 'needs-assessment',
    title: 'Análisis de Necesidades',
    description: 'Identifica brechas de conocimiento y habilidades en tu equipo.',
    icon: <CheckSquare className="w-8 h-8 text-blue-500" />,
    inputs: [
      { id: 'role', label: 'Rol del equipo', type: 'text', placeholder: 'Ej: Equipo de Ventas' },
      { id: 'objective', label: 'Objetivo de negocio', type: 'text', placeholder: 'Ej: Aumentar ventas un 20%' },
      { id: 'current_skills', label: 'Habilidades actuales (separadas por coma)', type: 'textarea', placeholder: 'Ej: Negociación, Cierre de ventas' },
    ],
    promptTemplate: 'Genera un plan de análisis de necesidades para un equipo de {role} cuyo objetivo es {objective}. Sus habilidades actuales son {current_skills}. Enfócate en identificar las brechas de habilidades críticas para alcanzar el objetivo.',
  },
  {
    id: 'learner-persona',
    title: 'Creación de Learner Personas',
    description: 'Define perfiles de tus aprendices para personalizar la formación.',
    icon: <Users className="w-8 h-8 text-green-500" />,
    inputs: [
      { id: 'department', label: 'Departamento', type: 'text', placeholder: 'Ej: Marketing' },
      { id: 'experience_level', label: 'Nivel de experiencia', type: 'text', placeholder: 'Ej: Junior (1-2 años)' },
      { id: 'learning_goals', label: 'Metas de aprendizaje', type: 'textarea', placeholder: 'Ej: Dominar SEO, Aprender análisis de datos' },
    ],
    promptTemplate: 'Crea una learner persona para un empleado del departamento de {department} con un nivel de experiencia de {experience_level}. Sus metas de aprendizaje son: {learning_goals}. Incluye motivaciones, frustraciones y canales de aprendizaje preferidos.',
  },
  {
    id: 'learning-objectives',
    title: 'Definición de Objetivos',
    description: 'Establece objetivos de aprendizaje claros, medibles y alcanzables.',
    icon: <Target className="w-8 h-8 text-red-500" />,
    inputs: [
      { id: 'topic', label: 'Tema de la formación', type: 'text', placeholder: 'Ej: Ciberseguridad para empleados' },
      { id: 'desired_outcome', label: 'Resultado deseado', type: 'text', placeholder: 'Ej: Reducir incidentes de phishing' },
      { id: 'audience', label: 'Audiencia', type: 'text', placeholder: 'Ej: Todos los empleados' },
    ],
    promptTemplate: 'Define 3 objetivos de aprendizaje SMART para una formación sobre {topic} dirigida a {audience}. El resultado deseado es {desired_outcome}.',
  },
];

const LxdToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const generatedPrompt = useMemo(() => {
    if (!selectedTool) return '';
    const tool = toolsData.find(t => t.id === selectedTool.id);
    if (!tool) return '';
    
    let prompt = tool.promptTemplate;
    for (const key in formValues) {
      prompt = prompt.replace(`{${key}}`, formValues[key] || `[${key}]`);
    }
    return prompt;
  }, [selectedTool, formValues]);

  useEffect(() => {
    if (selectedTool) {
      const initialValues = {};
      selectedTool.inputs.forEach(input => {
        initialValues[input.id] = '';
      });
      setFormValues(initialValues);
      const savedNotes = localStorage.getItem(`lxd_notes_${selectedTool.id}`) || '';
      setNotes(savedNotes);
    }
  }, [selectedTool]);

  const handleInputChange = (id, value) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({ title: '¡Copiado!', description: 'Prompt copiado al portapapeles.' });
  };

  const handleSaveNote = () => {
    if (selectedTool) {
      localStorage.setItem(`lxd_notes_${selectedTool.id}`, notes);
      toast({ title: '¡Nota guardada!', description: 'Tus notas se han guardado en este navegador.' });
    }
  };

  const closeModal = () => setSelectedTool(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md p-6">
        <h1 className="text-3xl font-bold text-primary">Diagnóstico y Diseño Instruccional</h1>
        <p className="text-muted-foreground mt-1">Herramientas para identificar necesidades y diseñar rutas efectivas.</p>
      </header>

      <main className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Lightbulb className="text-amber-500"/> Herramientas</h2>
          <nav>
            <ul className="space-y-2">
              {toolsData.map(tool => (
                <li key={tool.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => document.getElementById(tool.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {tool.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {toolsData.map(tool => (
              <motion.div
                key={tool.id}
                id={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  className="h-full cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setSelectedTool(tool)}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    {tool.icon}
                    <div>
                      <CardTitle>{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedTool && (
          <Dialog open={!!selectedTool} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedTool.title}</DialogTitle>
                <DialogDescription>{selectedTool.description}</DialogDescription>
              </DialogHeader>
              
              <div className="flex-grow overflow-y-auto pr-6 -mr-6 space-y-4">
                <div className="space-y-4">
                  {selectedTool.inputs.map(input => (
                    <div key={input.id}>
                      <Label htmlFor={input.id}>{input.label}</Label>
                      {input.type === 'textarea' ? (
                        <Textarea
                          id={input.id}
                          placeholder={input.placeholder}
                          value={formValues[input.id] || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <Input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          value={formValues[input.id] || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="promptOut">Prompt generado</Label>
                  <Textarea id="promptOut" value={generatedPrompt} readOnly rows={6} />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleCopy}><Copy className="w-4 h-4 mr-2" /> Copiar</Button>
                  <Button onClick={handleSaveNote} variant="outline"><Save className="w-4 h-4 mr-2" /> Guardar nota</Button>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="notesArea">Mis notas</Label>
                  <Textarea
                    id="notesArea"
                    placeholder="Tus notas se guardan en este navegador (localStorage)."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>Cerrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LxdToolsPage;