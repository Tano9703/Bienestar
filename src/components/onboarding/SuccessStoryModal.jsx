import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Save } from 'lucide-react';

const SuccessStoryModal = ({ story, isOpen, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedStory, setEditedStory] = useState(story);
    const { toast } = useToast();

    useEffect(() => {
        setEditedStory(story);
        setIsEditing(false);
    }, [story]);

    if (!story) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStory(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(story.index, editedStory);
        setIsEditing(false);
        toast({
            title: "¡Éxito!",
            description: "La historia de éxito ha sido actualizada.",
            className: "bg-green-500 text-white",
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px] p-0">
                <DialogHeader className="p-6 pb-2 flex flex-row justify-between items-start">
                    <DialogTitle className="text-2xl">{isEditing ? 'Editando Historia' : `Historia de Éxito: ${story.name}`}</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="w-5 h-5" />
                    </Button>
                </DialogHeader>
                <div className="p-6 pt-0">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" name="name" value={editedStory.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="videoUrl">URL del Video (Embed)</Label>
                                <Input id="videoUrl" name="videoUrl" value={editedStory.videoUrl} onChange={handleInputChange} />
                            </div>
                            <Button onClick={handleSave} className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </Button>
                        </div>
                    ) : (
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={story.videoUrl}
                                title={`Historia de éxito de ${story.name}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessStoryModal;