import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Search, Filter } from 'lucide-react';
    import PostCard from '@/components/PostCard';
    import { Skeleton } from '@/components/ui/skeleton';

    const demoPosts = [
      {
        id: 1,
        author: 'Ana Pérez',
        avatarUrl: 'https://i.pravatar.cc/150?u=ana',
        timestamp: 'Hace 2 horas',
        content: '¡Nuevo módulo de Metodologías Lean disponible! ¿Alguien ya lo empezó? Me encantaría escuchar sus primeras impresiones. #AprendizajeContinuo #LeanThinking',
        link: null,
        likes: 15,
        comments: 3,
        shares: 2,
      },
      {
        id: 2,
        author: 'Carlos López',
        avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
        timestamp: 'Ayer a las 5:30 PM',
        content: 'Comparto este artículo súper interesante sobre el futuro del trabajo remoto y cómo impacta la colaboración en equipos distribuidos. ¡Lectura recomendada!',
        link: { title: 'The Future of Remote Work', url: '#' },
        likes: 22,
        comments: 5,
        shares: 7,
      },
      {
        id: 3,
        author: 'Laura Gómez',
        avatarUrl: 'https://i.pravatar.cc/150?u=laura',
        timestamp: 'Hace 3 días',
        content: 'Recordatorio: Mañana tenemos la sesión de Q&A sobre la nueva plataforma de gestión de proyectos. ¡No falten! Dejen sus preguntas aquí si no pueden asistir.',
        link: null,
        likes: 8,
        comments: 1,
        shares: 0,
      },
    ];

    const PostSkeleton = () => (
      <div className="bg-white p-6 rounded-2xl soft-shadow space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 w-[80px]" />
        </div>
      </div>
    );

    const CommunityFeed = () => {
      const [isLoading, setIsLoading] = React.useState(false);

      const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
      };

      return (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl soft-shadow flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-mid-gray" />
              <Input placeholder="Buscar en el feed..." className="pl-10 bg-brand-light-gray border-0 focus-visible:ring-brand-primary-blue" />
            </div>
            <Button variant="outline" className="border-gray-300 text-brand-charcoal">
              <Filter className="h-5 w-5 mr-2 text-brand-mid-gray" />
              Filtros
            </Button>
          </div>

          <div className="space-y-6">
            {demoPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {isLoading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          <div className="text-center">
            <Button variant="outline" className="rounded-full px-6 border-gray-300" onClick={handleLoadMore}>
              Cargar más
            </Button>
          </div>
        </div>
      );
    };

    export default CommunityFeed;