import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Pencil, Save, Send, Share2, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";

export const ReflectionEntryForm = ({ template, existingEntry, onSave }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [keyPhrase, setKeyPhrase] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);

  useEffect(() => {
    if (existingEntry) {
      setTitle(existingEntry.title || '');
      setKeyPhrase(existingEntry.keyPhrase || '');
      setDescription(existingEntry.description || '');
      setFile(existingEntry.file || null);
    } else if (template) {
      setTitle('');
      setKeyPhrase('');
      setDescription(template.question);
      setFile(null);
    }
  }, [template, existingEntry]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({ description: `Archivo "${e.target.files[0].name}" seleccionado.` });
    }
  };

  const handleSave = () => {
    if (!title) {
      toast({ variant: 'destructive', title: 'Falta el título', description: 'Por favor, añade un título a tu reflexión.' });
      return;
    }
    onSave({
      templateId: template.id,
      title,
      keyPhrase,
      description,
      file,
      shared: existingEntry ? existingEntry.shared : false,
    });
    toast({ title: 'Borrador guardado', description: 'Tu reflexión ha sido guardada en tu bitácora.' });
  };
  
  const handleSend = () => {
    if (!title) {
        toast({ variant: 'destructive', title: 'Falta el título', description: 'Por favor, añade un título a tu reflexión.' });
        return;
    }
    if (existingEntry) {
        // If editing, just save. The share status is already set.
        onSave({
            templateId: template.id,
            title,
            keyPhrase,
            description,
            file,
            shared: existingEntry.shared,
        });
        toast({ title: '¡Actualizado!', description: 'Tu reflexión ha sido actualizada.' });
    } else {
        setIsSharingModalOpen(true);
    }
  };

  const handleShareChoice = (share) => {
    setIsSharingModalOpen(false);
    onSave({
      templateId: template.id,
      title,
      keyPhrase,
      description,
      file,
      shared: share,
    });
    if(share){
        toast({ title: '¡Compartido!', description: 'Tu reflexión ha sido enviada al muro de la comunidad.' });
    } else {
        toast({ title: '¡Enviado!', description: 'Tu reflexión ha sido guardada en tu bitácora personal.' });
    }
  };

  const Icon = template.icon;

  return (
    <>
      <div className="space-y-4 p-1">
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`h-8 w-8 ${template.color}`} />
          <h2 className="text-2xl font-bold">{template.title}</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="entry-title">Título de la entrada</Label>
          <Input id="entry-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Un título para tu reflexión..." disabled={!isEditing} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="entry-key-phrase">Frase clave</Label>
          <Input id="entry-key-phrase" value={keyPhrase} onChange={(e) => setKeyPhrase(e.target.value)} placeholder="Una frase que resuma tu sentir..." disabled={!isEditing} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="entry-description">{template.question}</Label>
          <Textarea id="entry-description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px]" placeholder="Describe tu reflexión aquí..." disabled={!isEditing}/>
        </div>

        <div>
          <Label htmlFor="file-upload" className="w-full inline-block">
            <Button as="div" variant="outline" className="w-full cursor-pointer" disabled={!isEditing}>
              <UploadCloud className="mr-2 h-4 w-4" />
              {file ? `Archivo: ${typeof file === 'string' ? file : file.name}` : 'Cargar un archivo'}
            </Button>
          </Label>
          <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} disabled={!isEditing} />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="mr-2 h-4 w-4" />
            {isEditing ? 'Bloquear' : 'Editar'}
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button onClick={handleSend} className={template.buttonColor}>
            <Send className="mr-2 h-4 w-4" />
            {existingEntry ? 'Actualizar' : 'Enviar'}
          </Button>
        </div>
      </div>

      <Dialog open={isSharingModalOpen} onOpenChange={setIsSharingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Dónde quieres publicar tu reflexión?</DialogTitle>
            <DialogDescription>
              Elige si esta entrada será solo para ti o si quieres compartirla con la comunidad.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
             <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleShareChoice(false)}>
                <User className="h-8 w-8 text-primary"/>
                <span className="text-center">Solo en mi Bitácora</span>
             </Button>
             <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleShareChoice(true)}>
                <Share2 className="h-8 w-8 text-green-500"/>
                <span className="text-center">Muro de la Comunidad</span>
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};