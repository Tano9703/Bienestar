import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import WellnessHeader from '@/components/wellness/WellnessHeader';
import WellnessSidebar from '@/components/wellness/WellnessSidebar';
import { wellnessSections } from '@/data/wellnessData';

const WellnessLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { sectionId } = useParams();

    const currentSectionId = sectionId || 'mood-tracker';
    const currentSection = wellnessSections.find(s => s.id === currentSectionId) || wellnessSections[0];

    return (
        <div className="flex h-screen bg-brand-light-gray text-brand-charcoal overflow-hidden">
            <WellnessSidebar 
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                currentSectionId={currentSectionId}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <WellnessHeader 
                    onMenuClick={() => setSidebarOpen(true)} 
                    currentSection={currentSection}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light-gray">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSectionId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WellnessLayout;