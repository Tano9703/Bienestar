import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Youtube, Code, FileText, Download, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

const cursoData = {
  sig: { 
    title: 'Introducción SIG', 
    description: 'Qué es el Sistema Integrado de Gestión?',
    objetivo: 'Comprender los fundamentos del Sistema Integrado de Gestión (SIG) y su importancia para la organización, identificando sus componentes principales y beneficios.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>Aquí se mostrará el contenido <strong>HTML</strong> interactivo sobre SIG.</p><p><em>(Este es un marcador de posición)</em></p></div>',
    testUrl: '/poc/curso/sig/test',
    downloadUrl: '/downloads/sig-material.pdf'
  },
  hseq: { 
    title: 'Principios en HSEQ', 
    description: 'Qué es seguridad y salud en el trabajo?',
    objetivo: 'Conocer los principios fundamentales de Salud, Seguridad, Medio Ambiente y Calidad (HSEQ) y cómo se aplican en el entorno laboral diario.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>Aquí se mostrará el contenido <strong>HTML</strong> interactivo sobre HSEQ.</p><p><em>(Este es un marcador de posición)</em></p></div>',
    testUrl: '/poc/curso/hseq/test',
    downloadUrl: '/downloads/hseq-material.pdf'
  },
  ambiental: { 
    title: 'Gestión Ambiental', 
    description: 'Qué es la Gestión Ambiental?',
    objetivo: 'Entender la importancia de la gestión ambiental, las políticas de la empresa y las responsabilidades individuales para promover la sostenibilidad.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>Aquí se mostrará el contenido <strong>HTML</strong> interactivo sobre Gestión Ambiental.</p><p><em>(Este es un marcador de posición)</em></p></div>',
    testUrl: '/poc/curso/ambiental/test',
    downloadUrl: '/downloads/ambiental-material.pdf'
  },
};

const CursoDetailPage = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cursoInfo = cursoData[cursoId];

  const [curso, setCurso] = useState(cursoInfo);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newObjetivo, setNewObjetivo] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newEmbedContent, setNewEmbedContent] = useState('');

  useEffect(() => {
    const storedCurso = localStorage.getItem(`curso-${cursoId}`);
    const initialData = storedCurso ? JSON.parse(storedCurso) : cursoInfo;
    
    if (initialData) {
      setCurso(initialData);
      setNewTitle(initialData.title);
      setNewDescription(initialData.description);
      setNewObjetivo(initialData.objetivo);
      setNewVideoUrl(initialData.videoUrl);
      setNewEmbedContent(initialData.embedContent);
    }
  }, [cursoId]);

  const updateCursoData = (updatedData) => {
    const newCursoState = { ...curso, ...updatedData };
    setCurso(newCursoState);
    localStorage.setItem(`curso-${cursoId}`, JSON.stringify(newCursoState));
  };
  
  const handleHeaderChange = () => {
    updateCursoData({ title: newTitle, description: newDescription });
    toast({
      title: "¡Cabecera actualizada!",
      description: "El título y la descripción del curso han sido cambiados.",
    });
  };

  const handleObjetivoChange = () => {
    updateCursoData({ objetivo: newObjetivo });
    toast({
      title: "¡Objetivo actualizado!",
      description: "El objetivo de aprendizaje ha sido cambiado con éxito.",
    });
  };

  const handleVideoUrlChange = () => {
    updateCursoData({ videoUrl: newVideoUrl });
    toast({
      title: "¡Video actualizado!",
      description: "El video de introducción ha sido cambiado con éxito.",
    });
  };

  const handleEmbedContentChange = () => {
    updateCursoData({ embedContent: newEmbedContent });
    toast({
      title: "¡Contenido actualizado!",
      description: "El contenido interactivo ha sido cambiado con éxito.",
    });
  };

  const handleActionClick = (featureName) => {
    toast({
      title: `🚧 ¡${featureName} en camino!`,
      description: "Esta función aún no está implementada, ¡pero estará disponible muy pronto!",
    });
  };

  if (!curso) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Error 404</h1>
          <p className="text-lg text-gray-600 mb-8">Curso no encontrado</p>
          <Button onClick={() => navigate('/poc')} className="bg-primary text-primary-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Módulos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Button onClick={() => navigate('/poc')} variant="ghost" className="mb-8 text-primary hover:bg-primary/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Catálogo de Cursos
        </Button>
        
        <Card className="overflow-hidden shadow-lg border-none">
          <CardHeader className="bg-primary text-primary-foreground p-6 relative">
            <div className="pr-16">
                <CardTitle className="text-3xl font-bold">{curso.title}</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-lg">{curso.description}</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="absolute top-6 right-6 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Editar cabecera del curso</DialogTitle>
                  <DialogDescription>
                    Actualiza el título y la descripción de tu curso.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Título</Label>
                    <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descripción</Label>
                    <Input id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                   <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                   <DialogClose asChild><Button type="button" onClick={handleHeaderChange}>Guardar cambios</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Target className="mr-3 text-primary h-6 w-6" />
                  Objetivo de Aprendizaje
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                     <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Editar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Editar Objetivo de Aprendizaje</DialogTitle>
                      <DialogDescription>Modifica el objetivo principal de este curso.</DialogDescription>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                        <Label htmlFor="objetivo" className="sr-only">Objetivo</Label>
                        <Textarea id="objetivo" value={newObjetivo} onChange={(e) => setNewObjetivo(e.target.value)} className="min-h-[150px]" />
                     </div>
                     <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                        <DialogClose asChild><Button type="button" onClick={handleObjetivoChange}>Guardar cambios</Button></DialogClose>
                     </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">{curso.objetivo}</p>
            </section>

            <div className="w-full h-px bg-gray-200"></div>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Youtube className="mr-3 text-red-500 h-6 w-6" />
                  Video de Introducción
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Editar video de introducción</DialogTitle>
                      <DialogDescription>
                        Pega el nuevo enlace del video de YouTube aquí. Asegúrate de que sea un enlace para incrustar (embed).
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoUrl" className="text-right">
                          URL
                        </Label>
                        <Input
                          id="videoUrl"
                          value={newVideoUrl}
                          onChange={(e) => setNewVideoUrl(e.target.value)}
                          className="col-span-3"
                          placeholder="https://www.youtube.com/embed/..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="button" onClick={handleVideoUrlChange}>
                          Guardar cambios
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md border">
                <iframe
                  className="w-full h-full"
                  src={curso.videoUrl}
                  title={`Video de introducción para ${curso.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>

            <div className="w-full h-px bg-gray-200"></div>

            <section>
               <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Code className="mr-3 text-indigo-500 h-6 w-6" />
                  Contenido Interactivo
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Editar Contenido Interactivo</DialogTitle>
                      <DialogDescription>
                        Pega tu código HTML aquí. El contenido se renderizará directamente en la página.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Label htmlFor="embedContent" className="sr-only">
                        Código HTML
                      </Label>
                      <Textarea
                        id="embedContent"
                        value={newEmbedContent}
                        onChange={(e) => setNewEmbedContent(e.target.value)}
                        className="col-span-3 min-h-[200px] font-mono text-sm"
                        placeholder="<p>Tu código HTML aquí...</p>"
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancelar
                        </Button>
                      </DialogClose>
                       <DialogClose asChild>
                        <Button type="button" onClick={handleEmbedContentChange}>
                          Guardar cambios
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div dangerouslySetInnerHTML={{ __html: curso.embedContent }} />
            </section>

            <div className="w-full h-px bg-gray-200"></div>

            <section className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleActionClick('El test del curso')}>
                <FileText className="mr-2 h-5 w-5" />
                Realizar Test del Curso
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleActionClick('La descarga de contenido')}>
                <Download className="mr-2 h-5 w-5" />
                Descargar Contenido
              </Button>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CursoDetailPage;