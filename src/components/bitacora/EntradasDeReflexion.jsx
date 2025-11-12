import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart, Trophy, Key, Star, PlusCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ReflectionEntryForm } from '@/components/bitacora/ReflectionEntryForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const templates = [
  {
    id: 'gratitude',
    icon: Heart,
    title: 'Gratitud semanal',
    question: 'Describe tus pensamientos sobre la gratitud...',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    buttonColor: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    id: 'challenges',
    icon: Trophy,
    title: 'Retos superados',
    question: 'Describe cómo venciste un obstáculo reciente.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    id: 'learnings',
    icon: Key,
    title: 'Aprendizajes clave',
    question: 'Describe lo que has aprendido últimamente.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'achievements',
    icon: Star,
    title: 'Logros recientes',
    question: 'Describe tus pequeños y grandes logros.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
  },
];

const generateMockEntries = () => {
  const entries = [];
  for (let i = 0; i < 20; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    entries.push({
      id: i,
      templateId: template.id,
      title: `Reflexión de hace ${i} días`,
      keyPhrase: `Frase clave ${i}`,
      description: `Esta es una reflexión sobre ${template.title.toLowerCase()} de hace ${i} días.`,
      date: subDays(new Date(), i).toISOString(),
      file: null,
      shared: Math.random() > 0.5,
    });
  }
  return entries;
};

const mockEntries = generateMockEntries();

const EntradasDeReflexion = () => {
  const [entries, setEntries] = useState(mockEntries);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);

  const handleSaveEntry = (entryData) => {
    if (editingEntry) {
      // Update existing entry
      setEntries(prev => prev.map(e => e.id === editingEntry.id ? { ...editingEntry, ...entryData } : e));
      setEditingEntry(null);
    } else {
      // Add new entry
      const newEntry = {
        id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 0,
        ...entryData,
        date: new Date().toISOString()
      };
      setEntries(prev => [newEntry, ...prev]);
    }
    setIsEntryFormOpen(false);
    setSelectedTemplate(null);
  };
  
  const openEntryFormForTemplate = (template) => {
      setSelectedTemplate(template);
      setEditingEntry(null);
      setIsTemplateSelectorOpen(false);
      setIsEntryFormOpen(true);
  };

  const openEntryForEditing = (entry) => {
    const template = getTemplateById(entry.templateId);
    setSelectedTemplate(template);
    setEditingEntry(entry);
    setViewingCategory(null); // Close category view if open
    setIsEntryFormOpen(true);
  };

  const summaryData = useMemo(() => {
    return templates.map(template => ({
      ...template,
      count: entries.filter(e => e.templateId === template.id).length,
    }));
  }, [entries]);

  const chartData = useMemo(() => {
    const labels = Array.from({ length: 7 }).map((_, i) => format(subDays(new Date(), i), 'MMM d', { locale: es })).reverse();
    const datasets = templates.map(template => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(`--${template.id}`).trim();
      return {
        label: template.title,
        data: labels.map(label => {
          return entries.filter(entry => 
            format(new Date(entry.date), 'MMM d', { locale: es }) === label && entry.templateId === template.id
          ).length;
        }),
        backgroundColor: `hsla(${color}, 0.7)`,
      };
    });

    return { labels, datasets };
  }, [entries]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Reflexiones en los últimos 7 días' },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };
  
  const getTemplateById = (id) => templates.find(t => t.id === id);

  const entriesForViewing = useMemo(() => {
    if (!viewingCategory) return [];
    return entries
      .filter(e => e.templateId === viewingCategory.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [entries, viewingCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Dashboard de Reflexión</h2>
        <Button onClick={() => setIsTemplateSelectorOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Reflexión
        </Button>
      </div>
      
      <Dialog open={isTemplateSelectorOpen} onOpenChange={setIsTemplateSelectorOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Elige una plantilla</DialogTitle>
              <DialogDescription>¿Sobre qué te gustaría reflexionar hoy?</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {templates.map(template => (
                  <Button key={template.id} variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => openEntryFormForTemplate(template)}>
                    <template.icon className={`h-6 w-6 ${template.color}`} />
                    <span>{template.title}</span>
                  </Button>
              ))}
            </div>
          </DialogContent>
      </Dialog>
      
      <Dialog open={isEntryFormOpen} onOpenChange={setIsEntryFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          {(selectedTemplate || editingEntry) && (
            <ReflectionEntryForm 
              template={selectedTemplate || getTemplateById(editingEntry.templateId)} 
              existingEntry={editingEntry}
              onSave={handleSaveEntry} 
              onCancel={() => setIsEntryFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingCategory} onOpenChange={() => setViewingCategory(null)}>
        <DialogContent className="sm:max-w-2xl">
          {viewingCategory && (
            <>
              <DialogHeader>
                <DialogTitle>Historial de: {viewingCategory.title}</DialogTitle>
                <DialogDescription>Aquí puedes ver y editar tus entradas pasadas.</DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-4 mt-4">
                {entriesForViewing.length > 0 ? (
                  entriesForViewing.map(entry => (
                    <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-semibold">{entry.title}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(entry.date), "PPP", { locale: es })}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => openEntryForEditing(entry)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No hay entradas en esta categoría todavía.</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summaryData.map(item => (
          <Card 
            key={item.id} 
            className={`${item.bgColor} border-0 cursor-pointer hover:scale-105 transition-transform duration-200`}
            onClick={() => setViewingCategory(item)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${item.color}`}>{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
              <p className="text-xs text-muted-foreground">entradas totales</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <Bar options={chartOptions} data={chartData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Historial de Entradas</CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto pr-2">
            <div className="space-y-4">
              {entries.slice(0, 10).map(entry => {
                const template = getTemplateById(entry.templateId);
                if (!template) return null;
                const Icon = template.icon;
                return (
                  <div 
                    key={entry.id} 
                    className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => openEntryForEditing(entry)}
                  >
                    <div className={`p-2 rounded-full ${template.bgColor}`}>
                      <Icon className={`h-5 w-5 ${template.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{entry.title || template.title}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(entry.date), "eeee, d 'de' MMMM", { locale: es })}</p>
                      <p className="text-sm text-muted-foreground mt-1 truncate">{entry.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

    </motion.div>
  );
};

export default EntradasDeReflexion;