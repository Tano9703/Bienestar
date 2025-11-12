import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search, Bell, Star, Users, Home, Settings, Filter, List, LayoutGrid, ThumbsUp, MessageCircle, Bookmark, Share2, UploadCloud, BarChart2, AlertTriangle, Eye, Folder, Video, FileText, Music, Image as ImageIcon, PlusCircle, Edit3, Trash2, ChevronDown, ChevronUp, X, SlidersHorizontal, Save
} from 'lucide-react';

const initialMediaItems = [
  { id: 1, title: "Introducción a Blockchain", category: "Blockchain", type: "Video", views: 1250, subscribers: 300, items: 12, tags: ["crypto", "tecnología", "finanzas"], isFavorite: true, lastUpdate: "2024-05-15" },
  { id: 2, title: "Estrategias de Educación 2.0", category: "Educación 2.0", type: "Documento", views: 850, subscribers: 150, items: 8, tags: ["edtech", "aprendizaje", "innovación"], isFavorite: false, lastUpdate: "2024-05-10" },
  { id: 3, title: "Podcast: El Futuro del Trabajo", category: "Podcast", type: "Audio", views: 2500, subscribers: 500, items: 5, tags: ["tendencias", "HR", "productividad"], isFavorite: true, lastUpdate: "2024-05-20" },
  { id: 4, title: "Galería de Diseño UX", category: "Diseño", type: "Imagen", views: 980, subscribers: 220, items: 25, tags: ["ui", "ux", "inspiración"], isFavorite: false, lastUpdate: "2024-05-01" },
  { id: 5, title: "Curso Completo de Python", category: "Programación", type: "Video", views: 3500, subscribers: 800, items: 40, tags: ["python", "desarrollo", "código"], isFavorite: false, lastUpdate: "2024-04-25" },
  { id: 6, title: "Marketing Digital Avanzado", category: "Marketing", type: "Documento", views: 1800, subscribers: 450, items: 15, tags: ["seo", "sem", "redes sociales"], isFavorite: true, lastUpdate: "2024-05-18" },
];

const categories = ["Todos", "Blockchain", "Educación 2.0", "Podcast", "Diseño", "Programación", "Marketing"];
const popularTags = ["tecnología", "aprendizaje", "innovación", "HR", "productividad", "ui/ux", "desarrollo", "seo"];

const getIconForType = (type) => {
  switch (type) {
    case "Video": return <Video size={12} />;
    case "Documento": return <FileText size={12} />;
    case "Audio": return <Music size={12} />;
    case "Imagen": return <ImageIcon size={12} />;
    default: return <Folder size={12} />;
  }
};

const MediaPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaItems, setMediaItems] = useState(initialMediaItems);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (id) => {
    setMediaItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  const filteredMediaItems = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag));
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [mediaItems, searchTerm, selectedCategory, selectedTags]);

  const topOfTheMonth = useMemo(() => {
    return [...mediaItems].sort((a, b) => b.views - a.views).slice(0, 4);
  }, [mediaItems]);

  const openPreviewModal = (item) => setSelectedItem(item);
  const closePreviewModal = () => setSelectedItem(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-primary-foreground hover:bg-primary/80" onClick={() => navigate('/')}>
              <Home size={20}/>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Mediateca – CrossLearning</h1>
              <p className="text-xs opacity-80">Tu repositorio multimedia centralizado y colaborativo</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-40 sm:w-64">
              <Input 
                type="search" 
                placeholder="Buscar en mediateca..." 
                className="bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 border-0 focus:bg-primary-foreground/30 h-9 text-sm pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-foreground/70" />
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-primary"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Star size={20} />
            </Button>
             <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex-grow py-6 px-4">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <aside className={`md:col-span-3 bg-card p-4 rounded-lg shadow-lg border border-slate-200 mb-6 md:mb-0 h-fit sticky top-[88px] z-20 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Filter size={20} className="mr-2 text-primary" />
                Filtros
              </h2>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="mb-6">
              <Label className="text-sm font-medium text-muted-foreground">Categorías</Label>
              <ul className="mt-2 space-y-1">
                {categories.map(cat => (
                  <li key={cat}>
                    <Button 
                      variant={selectedCategory === cat ? "secondary" : "ghost"} 
                      className={`w-full justify-start text-sm ${selectedCategory === cat ? 'font-semibold text-primary' : 'text-foreground hover:text-primary hover:bg-primary/10'}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <Label className="text-sm font-medium text-muted-foreground">Etiquetas Populares</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Button 
                    key={tag} 
                    variant={selectedTags.includes(tag) ? "default" : "outline"} 
                    size="xs"
                    className={`text-xs rounded-full ${selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : 'border-primary/50 text-primary hover:bg-primary/10'}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="text-sm font-medium text-muted-foreground">Rango de Vistas</Label>
              <Input type="range" className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mt-2 accent-primary" />
            </div>
             <Button variant="outline" className="w-full mt-4 text-sm" onClick={() => { setSelectedCategory("Todos"); setSelectedTags([]); setSearchTerm("");}}>
                Limpiar Filtros
            </Button>
          </aside>

          <main className="md:col-span-9">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-secondary">Explorar Mediateca</h2>
                <p className="text-muted-foreground">Descubre recursos, colecciones y conocimiento.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-primary/10 text-primary' : ''}>
                  <List size={20} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-primary/10 text-primary' : ''}>
                  <LayoutGrid size={20} />
                </Button>
                <Button className="md:hidden" variant="outline" size="icon" onClick={() => setShowFilters(true)}>
                  <SlidersHorizontal size={20} />
                </Button>
                 <Button variant="default">
                  <PlusCircle size={18} className="mr-2"/> Cargar Contenido
                </Button>
              </div>
            </div>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-secondary mb-3">Top del Mes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topOfTheMonth.map(item => (
                    <motion.div key={item.id} whileHover={{ y: -5 }}>
                      <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer" onClick={() => openPreviewModal(item)}>
                        <div className="relative h-32 bg-muted">
                          <img  alt={item.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2" />
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                            {getIconForType(item.type)}
                            <span className="ml-1">{item.type}</span>
                          </div>
                        </div>
                        <CardContent className="p-3 flex-grow">
                          <h3 className="text-sm font-semibold text-primary truncate mb-1">{item.title}</h3>
                          <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
            </section>
            
            <h2 className="text-xl font-semibold text-secondary mb-4">Todas las Colecciones ({filteredMediaItems.length})</h2>
            {filteredMediaItems.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No se encontraron resultados. Intenta ajustar tus filtros.</p>
            )}
            <motion.div 
              layout 
              className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
            >
              {filteredMediaItems.map(item => (
                <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ y: -5 }}>
                  <Card className={`overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                    <div className={`relative ${viewMode === 'grid' ? 'h-40' : 'h-28 w-1/3 sm:w-1/4 flex-shrink-0'} bg-muted`}>
                      <img  alt={item.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1583268921016-514d0a038478" />
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                        {getIconForType(item.type)}
                        <span className="ml-1">{item.type}</span>
                      </div>
                      <Button variant="ghost" size="icon" className={`absolute top-1 left-1 h-7 w-7 text-white hover:text-yellow-400 ${item.isFavorite ? 'text-yellow-400' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}>
                        <Star size={16} fill={item.isFavorite ? 'currentColor' : 'none'} />
                      </Button>
                    </div>
                    <CardContent className={`p-3 flex-grow flex flex-col justify-between ${viewMode === 'list' ? 'w-2/3 sm:w-3/4' : ''}`}>
                      <div>
                        <h3 className={`font-semibold text-primary truncate mb-1 ${viewMode === 'grid' ? 'text-md' : 'text-sm sm:text-base'}`}>{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.slice(0,3).map(tag => <span key={tag} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tag}</span>)}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 mt-auto">
                        <span className="flex items-center"><Folder size={12} className="mr-1"/> {item.items} ítems</span>
                        <span className="flex items-center"><Eye size={12} className="mr-1"/> {item.views}</span>
                        <span className="flex items-center"><Users size={12} className="mr-1"/> {item.subscribers}</span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="outline" size="xs" className="text-xs" onClick={() => openPreviewModal(item)}>Ver Detalles</Button>
                        <Button variant="ghost" size="xs" className="text-xs text-muted-foreground hover:text-primary"><Share2 size={12} className="mr-1"/> Compartir</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <section className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-semibold text-secondary mb-4">Actividad Reciente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center"><UploadCloud size={20} className="mr-2 text-primary"/>Usuarios que acaban de subir</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <Avatar className="h-6 w-6"><AvatarFallback>U{i}</AvatarFallback></Avatar>
                        <span>Usuario {i} subió "Nuevo Contenido {i}"</span>
                        <span className="text-xs text-muted-foreground ml-auto">hace {i*5}m</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center"><Bell size={20} className="mr-2 text-primary"/>Lo último en tus suscripciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     {[1,2,3].map(i => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <Avatar className="h-6 w-6"><AvatarFallback>A{i}</AvatarFallback></Avatar>
                        <span>Autor {i} publicó "Actualización Importante {i}"</span>
                        <span className="text-xs text-muted-foreground ml-auto">hace {i*10}m</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mt-12 pt-8 border-t">
              <h2 className="text-xl font-semibold text-secondary mb-4">Analytics Básico</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><BarChart2 size={20} className="mr-2 text-primary"/>Contenido Más Visto</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-40 bg-muted rounded flex items-center justify-center text-muted-foreground">Gráfico de barras aquí</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center"><AlertTriangle size={20} className="mr-2 text-destructive"/>Alertas de Contenido Frío</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">"Guía de Inversión Antigua" no ha recibido vistas en 30 días.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

          </main>
        </div>
      </div>
      
      {selectedItem && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closePreviewModal}
        >
          <motion.div 
            className="bg-card p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-xl text-primary flex items-center">
                {getIconForType(selectedItem.type)}
                <span className="ml-2">{selectedItem.title}</span>
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={closePreviewModal}>
                <X size={24}/>
              </Button>
            </div>
            
            <div className="relative h-64 bg-muted rounded-md mb-4">
              <img  alt={selectedItem.title} className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1583268921016-514d0a038478" />
            </div>

            <CardDescription className="mb-2 text-sm">{selectedItem.category} - Actualizado: {selectedItem.lastUpdate}</CardDescription>
            <p className="text-sm text-muted-foreground mb-4">
              Descripción detallada del recurso "{selectedItem.title}". Este espacio contendría un resumen o los puntos clave del material multimedia.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedItem.tags.map(tag => <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>)}
            </div>

            <h4 className="font-semibold mb-2 text-md">Acciones Colaborativas</h4>
            <div className="space-y-3 mb-4">
              <Input placeholder="Añadir un comentario..." />
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm"><ThumbsUp size={16} className="mr-1"/> Reaccionar</Button>
                <Button variant="outline" size="sm"><Bookmark size={16} className="mr-1"/> Añadir a Colección</Button>
              </div>
            </div>
            
            <Button className="w-full" onClick={() => alert(`Abriendo mediateca completa para: ${selectedItem.title}`)}>
              Abrir mediateca completa
            </Button>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold mb-2 text-md text-muted-foreground">Panel de Administrador (Simulado)</h4>
              <div className="space-y-2 text-sm">
                <Label htmlFor="edit-title">Título:</Label>
                <Input id="edit-title" defaultValue={selectedItem.title} />
                <Label htmlFor="edit-desc">Descripción:</Label>
                <Input id="edit-desc" defaultValue={`Descripción de ${selectedItem.title}...`} />
                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="edit-visibility" />
                    <Label htmlFor="edit-visibility" className="text-sm font-normal">Público</Label>
                </div>
                <Button size="sm" className="mt-2"><Save size={16} className="mr-2"/> Guardar Cambios</Button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}

      <img 
        alt="Abstract background with soft purple and pink hues, blurred lights"
        className="fixed inset-0 w-full h-full object-cover opacity-10 -z-10 pointer-events-none"
         src="https://images.unsplash.com/photo-1587327903256-13698894157a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80" />
    </div>
  );
};

export default MediaPage;