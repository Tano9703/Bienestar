import React, { useState, useEffect } from 'react';
import { Youtube, CheckSquare, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditableLinkInline from './EditableLinkInline';
import { useToast } from "@/components/ui/use-toast";

const BienvenidaNarrativa = () => {
  const { toast } = useToast();
  const [quizLink, setQuizLink] = useState(localStorage.getItem('tripulacionesQuizLink') || 'https://forms.gle/example');
  const [isEditingQuizLink, setIsEditingQuizLink] = useState(false);
  const [tempQuizLink, setTempQuizLink] = useState('');

  const [videoLink, setVideoLink] = useState(localStorage.getItem('tripulacionesVideoLink') || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [isEditingVideoLink, setIsEditingVideoLink] = useState(false);
  const [tempVideoLink, setTempVideoLink] = useState('');

  useEffect(() => {
    localStorage.setItem('tripulacionesQuizLink', quizLink);
  }, [quizLink]);

  useEffect(() => {
    localStorage.setItem('tripulacionesVideoLink', videoLink);
  }, [videoLink]);

  const handleEditQuizLink = () => {
    setTempQuizLink(quizLink);
    setIsEditingQuizLink(true);
  };

  const handleSaveQuizLink = () => {
    setQuizLink(tempQuizLink);
    setIsEditingQuizLink(false);
  };

  const handleEditVideoLink = () => {
    setTempVideoLink(videoLink);
    setIsEditingVideoLink(true);
  };

  const handleSaveVideoLink = () => {
    setVideoLink(tempVideoLink);
    setIsEditingVideoLink(false);
  };
  
  const handleAccessQuiz = () => {
    window.open(quizLink, '_blank');
    localStorage.setItem('quizCompleted', 'true');
    window.dispatchEvent(new Event('storage'));
    toast({
      title: "✅ ¡Quiz marcado como completado!",
      description: "Has dado un paso más para conseguir tu insignia.",
    });
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example";
    let videoId;
    try {
        const urlObject = new URL(url);
        if (urlObject.hostname === 'youtu.be') {
            videoId = urlObject.pathname.substring(1).split('?')[0];
        } else {
            videoId = urlObject.searchParams.get('v');
        }
    } catch (e) {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        videoId = lastPart.includes('watch?v=') ? lastPart.split('watch?v=')[1] : lastPart;
    }
    
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId.split('&')[0]}?si=example`;
    }
    return "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example";
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground flex items-center">
            <Youtube size={16} className="mr-2 text-red-600"/>
            Vídeo de inmersión: historia de la “flota” y misión corporativa.
          </p>
          {!isEditingVideoLink && (
            <Button variant="ghost" size="icon" onClick={handleEditVideoLink} className="text-muted-foreground hover:text-primary h-8 w-8">
              <Pencil size={16} />
            </Button>
          )}
        </div>
        {isEditingVideoLink && (
          <div className="mb-2">
            <EditableLinkInline
                value={tempVideoLink}
                onChange={(e) => setTempVideoLink(e.target.value)}
                onSave={handleSaveVideoLink}
                onCancel={() => setIsEditingVideoLink(false)}
                placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        )}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-inner">
          <iframe
            key={videoLink}
            className="w-full h-full"
            src={getYouTubeEmbedUrl(videoLink)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
          </iframe>
        </div>
      </div>
      <div className="pt-4 border-t">
         <p className="text-sm text-muted-foreground mb-2">Quiz de ambientación: conceptos clave de proyectos activos.</p>
         {!isEditingQuizLink ? (
            <div className="flex items-center gap-2">
                <Button id="quiz-button" onClick={handleAccessQuiz}>
                    <CheckSquare size={18} className="mr-2" />
                    Acceder y Completar Quiz
                </Button>
                <Button variant="ghost" size="icon" onClick={handleEditQuizLink} className="text-muted-foreground hover:text-primary">
                    <Pencil size={16} />
                </Button>
            </div>
        ) : (
             <EditableLinkInline
                value={tempQuizLink}
                onChange={(e) => setTempQuizLink(e.target.value)}
                onSave={handleSaveQuizLink}
                onCancel={() => setIsEditingQuizLink(false)}
                placeholder="https://tu-enlace-aqui.com"
            />
        )}
      </div>
    </div>
  );
};

export default BienvenidaNarrativa;