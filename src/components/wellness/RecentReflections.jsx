import React from 'react';
import { motion } from 'framer-motion';
import { format, subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Smile, Frown, Meh, Annoyed, Laugh, PenSquare } from 'lucide-react';

const moodIcons = {
    1: { icon: Frown, color: 'text-red-600', label: 'Very Bad mood' },
    2: { icon: Annoyed, color: 'text-orange-500', label: 'Bad mood' },
    3: { icon: Meh, color: 'text-yellow-500', label: 'Neutral mood' },
    4: { icon: Smile, color: 'text-green-500', label: 'Good mood' },
    5: { icon: Laugh, color: 'text-sky-500', label: 'Very Good mood' },
};

const sampleReflections = [
    { mood: 5, date: subDays(new Date(), 1), title: 'Great Progress on Project', tags: ['Work', 'Achievement'] },
    { mood: 4, date: subDays(new Date(), 2), title: 'Family Dinner', tags: ['Personal', 'Growth'] },
    { mood: 2, date: subDays(new Date(), 3), title: 'Tough Feedback Session', tags: ['Work', 'Challenge'] },
];

const ReflectionItem = ({ reflection, onSelect }) => {
    const { icon: Icon, color, label } = moodIcons[reflection.mood] || moodIcons[3];
    return (
        <motion.div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(reflection)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(reflection)}
            className="flex items-start gap-4 p-4 bg-white border border-gray-200/80 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.02 }}
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
        >
            <Icon className={`w-8 h-8 flex-shrink-0 mt-1 ${color}`} aria-label={label} />
            <div className="flex-grow">
                <p className="text-sm font-semibold text-brand-deep-indigo">{format(reflection.date, 'EEEE, MMMM d')}</p>
                <p className="text-sm text-brand-charcoal">{reflection.title}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {reflection.tags.map(tag => (
                        <span key={tag} aria-label={`Category: ${tag}`} className="px-3 py-1 text-xs font-bold text-brand-charcoal bg-brand-light-gray rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


const RecentReflections = () => {
    const { toast } = useToast();
    const reflections = sampleReflections;

    const handleSelectReflection = (reflection) => {
        toast({
            title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    };

    const handleNewReflection = () => {
        toast({
            title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <Card className="rounded-2xl soft-shadow border-0">
            <CardHeader>
                <CardTitle className="text-brand-deep-indigo">Recent Reflections</CardTitle>
            </CardHeader>
            <CardContent>
                {reflections.length > 0 ? (
                    <motion.div 
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {reflections.map(reflection => (
                            <ReflectionItem key={reflection.date.toString()} reflection={reflection} onSelect={handleSelectReflection} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
                        <PenSquare className="mx-auto h-12 w-12 text-brand-charcoal" />
                        <h3 className="mt-2 text-sm font-semibold text-brand-deep-indigo">No reflections yet</h3>
                        <p className="mt-1 text-sm text-brand-charcoal">Start journaling today!</p>
                        <div className="mt-6">
                            <Button onClick={handleNewReflection}>
                                New Reflection
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentReflections;