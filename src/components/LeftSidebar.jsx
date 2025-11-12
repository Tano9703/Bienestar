import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { Paperclip, Smile, Tag, Rss, Users, Flame, Calendar } from 'lucide-react';

    const shortcuts = [
      { name: 'My Feed', icon: Rss },
      { name: 'Groups', icon: Users },
      { name: 'Popular Topics', icon: Flame },
      { name: 'Events', icon: Calendar },
    ];

    const LeftSidebar = () => {
      return (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl soft-shadow">
            <h3 className="font-bold text-lg text-brand-deep-indigo mb-2">¡Bienvenido!</h3>
            <p className="text-sm text-brand-charcoal">Este es tu espacio para conectar, compartir y crecer con la comunidad.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl soft-shadow">
            <Textarea
              placeholder="¿Qué estás pensando?"
              className="bg-brand-light-gray border-0 focus-visible:ring-brand-primary-blue min-h-[80px]"
              maxLength="500"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="text-brand-mid-gray hover:text-brand-primary-blue">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-brand-mid-gray hover:text-brand-primary-blue">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-brand-mid-gray hover:text-brand-primary-blue">
                  <Tag className="h-5 w-5" />
                </Button>
              </div>
              <Button className="bg-brand-primary-blue hover:bg-brand-deep-indigo rounded-full px-6">Post</Button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl soft-shadow">
            <h3 className="font-bold text-lg text-brand-deep-indigo mb-3">Accesos Directos</h3>
            <nav className="space-y-1">
              {shortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <Button key={item.name} variant="ghost" className="w-full justify-start text-brand-charcoal hover:bg-gray-200/70">
                    <Icon className="h-5 w-5 mr-3 text-brand-secondary-sky" />
                    {item.name}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      );
    };

    export default LeftSidebar;