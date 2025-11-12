import React, { useState } from 'react';
import { Smile, Save, Send, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";
import { MoodTrends } from '@/components/bitacora/MoodTrends';

const MoodTrackerContent = ({ contentProps, onEntrySubmit }) => {
  const { toast } = useToast();
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);

  const handleActionClick = (action) => {
    if (action === 'editar') {
      toast({
        title: 'Modo Edición',
        description: 'Puedes editar tu entrada directamente en el campo de texto.',
      });
      document.getElementById('moodLog').focus();
    } else {
      setIsTagModalOpen(true);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleConfirmTags = () => {
    setIsTagModalOpen(false);
    onEntrySubmit(selectedMood, selectedTags);
    setSelectedTags([]);
  };

  const getMoodColor = (value) => {
    if (value < 3) return "text-destructive";
    if (value < 4) return "text-yellow-500";
    return "text-green-500";
  };
  
  const getMoodBgColor = (value) => {
    if (value < 3) return "bg-destructive/10";
    if (value < 4) return "bg-yellow-500/10";
    return "bg-green-500/10";
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-lg mb-2 text-primary">{contentProps.selectorPrompt}</h4>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(val => (
            <Button
              key={val}
              variant={selectedMood === val ? "secondary" : "outline"}
              className={`p-2 h-auto border-border transition-all duration-200 ${selectedMood === val ? `ring-2 ring-primary ${getMoodBgColor(val)}` : 'hover:bg-accent'}`}
              onClick={() => setSelectedMood(val)}
            >
              <Smile size={20} className={getMoodColor(val)} />
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="moodLog" className="block text-sm font-medium text-foreground mb-1">{contentProps.logPrompt}</label>
        <textarea id="moodLog" rows="3" className="w-full p-2 border border-input rounded-md bg-background focus:ring-primary focus:border-primary" placeholder="Escribe aquí..."></textarea>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={() => handleActionClick('editar')}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button variant="outline" onClick={() => handleActionClick('guardar')}>
          <Save className="mr-2 h-4 w-4" />
          Guardar
        </Button>
        <Button onClick={() => handleActionClick('enviar')}>
          <Send className="mr-2 h-4 w-4" />
          Enviar
        </Button>
      </div>
      
      <MoodTrends trendOptions={contentProps.trendOptions} />

      <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asociar Categorías</DialogTitle>
            <DialogDescription>
              Selecciona una o más categorías para tu entrada.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 py-4">
            {contentProps.tags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmTags}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodTrackerContent;