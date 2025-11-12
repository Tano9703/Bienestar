import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { wellnessSections } from '@/data/wellnessData';

const NavItem = ({ section, isActive, onClick }) => {
    const Icon = section.icon;
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                isActive
                ? 'bg-brand-primary-blue text-white font-semibold shadow-md'
                : 'text-brand-charcoal hover:bg-brand-light-gray/80 hover:text-brand-deep-indigo'
            }`}
        >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="flex-grow">{section.title}</span>
        </button>
    );
};

const SidebarContent = ({ currentSectionId, onSelectSection, onClose }) => (
    <div className="flex flex-col h-full bg-white p-4">
        <div className="flex justify-between items-center mb-6 p-2">
            <Link to="/" className="flex-shrink-0">
                <img  alt="CrossLearning Logo" class="h-10 w-auto" src="https://horizons-cdn.hostinger.com/0e1f7dd3-06a3-49ec-a3f5-eb9a3a70d9a6/f37727e20374c5671d0f7193f8b3d12a.png" />
            </Link>
            {onClose && (
                <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                </Button>
            )}
        </div>
        <nav className="flex-1 space-y-2">
            {wellnessSections.map((section) => (
                <NavItem
                    key={section.id}
                    section={section}
                    isActive={currentSectionId === section.id}
                    onClick={() => onSelectSection(section.id)}
                />
            ))}
        </nav>
        <div className="mt-auto p-2">
            <div className="p-4 bg-brand-light-gray rounded-lg text-center">
                <p className="text-sm font-semibold text-brand-deep-indigo">Need help?</p>
                <p className="text-xs text-brand-charcoal mt-1">Contact support for any questions.</p>
                <Button size="sm" variant="outline" className="mt-3 w-full">Contact Support</Button>
            </div>
        </div>
    </div>
);


const WellnessSidebar = ({ isOpen, setIsOpen, currentSectionId }) => {
    const navigate = useNavigate();

    const handleSelectSection = (sectionId) => {
        navigate(`/wellness-log/${sectionId}`);
        setIsOpen(false);
    };

    const drawerVariants = {
        hidden: { x: '-100%' },
        visible: { x: '0%', transition: { type: 'tween', duration: 0.3 } },
        exit: { x: '-100%', transition: { type: 'tween', duration: 0.3 } },
    };

    return (
        <>
            <aside className="w-72 flex-shrink-0 hidden lg:block border-r border-gray-200/80">
                 <SidebarContent 
                    currentSectionId={currentSectionId} 
                    onSelectSection={handleSelectSection}
                />
            </aside>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 lg:hidden"
                            variants={drawerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                           <SidebarContent 
                                currentSectionId={currentSectionId} 
                                onSelectSection={handleSelectSection}
                                onClose={() => setIsOpen(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default WellnessSidebar;