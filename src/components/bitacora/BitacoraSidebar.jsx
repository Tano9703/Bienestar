import React from 'react';
import { Button } from '@/components/ui/button';
import { Folder, ChevronRight } from 'lucide-react';

export const BitacoraSidebar = ({ sections, selectedSection, onSelectSection }) => {
  const sidebarBgColor = "bg-slate-50";

  return (
    <aside className={`md:col-span-3 ${sidebarBgColor} p-4 rounded-lg shadow-md border border-border mb-6 md:mb-0 h-full`}>
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Folder size={20} className="mr-2 text-primary" />
        Secciones
      </h2>
      <nav className="space-y-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={selectedSection?.id === section.id ? "default" : "ghost"}
            className={`w-full justify-start items-center text-sm 
              ${selectedSection?.id === section.id 
                ? 'bg-primary text-primary-foreground font-semibold' 
                : 'text-foreground hover:text-primary hover:bg-primary/10'
              }`}
            onClick={() => onSelectSection(section)}
          >
            <section.icon size={16} className="mr-2.5 flex-shrink-0" />
            <span className="truncate">{section.title}</span>
            {selectedSection?.id === section.id && <ChevronRight size={16} className="ml-auto" />}
          </Button>
        ))}
      </nav>
    </aside>
  );
};