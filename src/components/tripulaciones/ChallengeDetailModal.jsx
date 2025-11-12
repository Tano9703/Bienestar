import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MessageSquare, Pencil, Paperclip, Link as LinkIcon, Trash2, FileText, Plus } from 'lucide-react';
import getChallengeIcon from '@/components/tripulaciones/challengeIcons';

const ChallengeDetailModal = ({ challenge, isOpen, onClose, onUpdate }) => {
  const [editedChallenge, setEditedChallenge] = useState(null);
  const [newLink, setNewLink] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (challenge) {
      setEditedChallenge({ ...challenge, attachments: challenge.attachments || [] });
    } else {
        setEditedChallenge(null);
    }
  }, [challenge]);

  if (!editedChallenge) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChallenge(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedChallenge);
    onClose();
  };

  const handleAddLink = () => {
    if (newLink.trim() === '') return;
    try {
      new URL(newLink); // Validate URL
      const newAttachment = { type: 'link', url: newLink.trim(), name: newLink.trim() };
      setEditedChallenge(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));
      setNewLink('');
    } catch (_) {
      alert("Por favor, introduce una URL válida.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newAttachment = { type: 'file', name: file.name, size: file.size, fileType: file.type };
     setEditedChallenge(prev => ({
      ...prev,
      attachments: [...prev.attachments, newAttachment]
    }));
    e.target.value = null;
  };

  const handleRemoveAttachment = (indexToRemove) => {
    setEditedChallenge(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, index) => index !== indexToRemove)
    }));
  };
  
  const Icon = getChallengeIcon(editedChallenge.icon);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
             <span className="p-2 bg-primary/10 text-primary rounded-md">
                <Icon size={24} />
             </span>
             <span className="text-xl">{editedChallenge.title}</span>
          </DialogTitle>
           <DialogDescription>
            Gestiona los detalles de este reto. Los cambios se guardarán automáticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2"><Pencil size={14}/>Título del Reto</Label>
            <Input id="title" name="title" value={editedChallenge.title} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedDate" className="flex items-center gap-2"><Calendar size={14}/>Fecha de Asignación</Label>
              <Input id="assignedDate" name="assignedDate" type="date" value={editedChallenge.assignedDate} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-2"><Calendar size={14}/>Fecha Límite</Label>
              <Input id="deadline" name="deadline" type="date" value={editedChallenge.deadline} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments" className="flex items-center gap-2"><MessageSquare size={14}/>Comentarios</Label>
            <Textarea id="comments" name="comments" value={editedChallenge.comments} onChange={handleInputChange} placeholder="Añade notas o comentarios sobre el reto..." />
          </div>
          
          <div className="space-y-3 pt-2">
            <Label className="flex items-center gap-2"><Paperclip size={14}/>Archivos y Enlaces</Label>
            <div className="space-y-2">
              {editedChallenge.attachments.length > 0 ? (
                editedChallenge.attachments.map((att, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md text-sm">
                    <div className="flex items-center gap-2 truncate min-w-0">
                      {att.type === 'link' ? <LinkIcon size={16} className="text-primary flex-shrink-0"/> : <FileText size={16} className="text-primary flex-shrink-0"/>}
                      {att.type === 'link' ? (
                         <a href={att.url} target="_blank" rel="noopener noreferrer" className="truncate hover:underline" title={att.url}>{att.name}</a>
                      ) : (
                        <span className="truncate" title={att.name}>{att.name}</span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => handleRemoveAttachment(index)}>
                      <Trash2 size={14} className="text-destructive"/>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-2">No hay archivos adjuntos.</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input 
                type="url" 
                placeholder="Pega un enlace aquí..." 
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyDown={(e) => {if(e.key === 'Enter') { e.preventDefault(); handleAddLink();}}}
              />
              <Button onClick={handleAddLink} variant="outline" size="sm">Añadir</Button>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
              <Plus size={16} className="mr-2"/>Adjuntar Archivo
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeDetailModal;