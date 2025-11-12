import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Save } from 'lucide-react';

const TimelineModal = ({ event, isOpen, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(event);
    const { toast } = useToast();

    useEffect(() => {
        setEditedEvent(event);
        setIsEditing(false);
    }, [event]);

    if (!event) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(event.index, editedEvent);
        setIsEditing(false);
        toast({
            title: "¡Éxito!",
            description: "El hito del timeline ha sido actualizado.",
            className: "bg-green-500 text-white",
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px] p-0">
                <DialogHeader className="p-6 pb-2 flex flex-row justify-between items-start">
                    <div>
                        <DialogTitle className="text-2xl">{isEditing ? 'Editando Hito' : event.title}</DialogTitle>
                        {!isEditing && <DialogDescription>{event.description}</DialogDescription>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="w-5 h-5" />
                    </Button>
                </DialogHeader>
                <div className="p-6 pt-0 grid gap-4">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Título</Label>
                                <Input id="title" name="title" value={editedEvent.title} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="videoUrl">URL del Video (Embed)</Label>
                                <Input id="videoUrl" name="videoUrl" value={editedEvent.videoUrl} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="imageUrl">URL de la Imagen</Label>
                                <Input id="imageUrl" name="imageUrl" value={editedEvent.imageUrl} onChange={handleInputChange} />
                            </div>
                            <Button onClick={handleSave} className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="aspect-video w-full">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={event.videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <div>
                                <img alt={`Imagen de apoyo para ${event.title}`} className="rounded-lg object-cover w-full h-48" src={event.imageUrl} />
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TimelineModal;