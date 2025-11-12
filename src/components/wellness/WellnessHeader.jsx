import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WellnessHeader = ({ onMenuClick, currentSection }) => {

    return (
        <header className="flex-shrink-0 bg-white border-b border-gray-200/80 sticky top-0 z-10">
            <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <button onClick={onMenuClick} className="lg:hidden mr-4 text-brand-charcoal">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </button>
                    <div className="flex items-center gap-4">
                         <div className="hidden sm:block p-3 bg-brand-primary-blue/10 rounded-full">
                            <currentSection.icon className="h-6 w-6 text-brand-primary-blue" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-brand-deep-indigo">{currentSection.title}</h1>
                            <p className="text-sm text-brand-charcoal hidden md:block">{currentSection.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default WellnessHeader;