import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smile, Target, Flame, Award, BookOpen, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const insightsData = [
    { title: "Average Mood", value: "7.8/10", change: "+0.5 vs last week", icon: Smile, changeColor: 'text-green-600' },
    { title: "Active Goals", value: "5", change: "65% avg. progress", icon: Target, changeColor: 'text-brand-charcoal' },
    { title: "Journaling Streak", value: "12 days", change: "Best: 25 days", icon: Flame, changeColor: 'text-brand-charcoal' },
    { title: "Wellness Score", value: "82/100", change: "", icon: Award, progress: 82, changeColor: 'text-brand-charcoal' },
];

const recommendations = [
    { title: "Suggested Reflection", description: "Based on your last entry, reflect on your achievements.", action: "Start Reflection" },
    { title: "Suggested New Goal", description: "Consider setting a 'Mindfulness' goal this week.", action: "Create Goal" },
];

const InsightsAndRecommendations = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (action) => {
        toast({
            title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isLoading ? 'hidden' : 'visible'}
            >
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)
                ) : (
                    insightsData.map((insight) => {
                        const Icon = insight.icon;
                        return (
                        <motion.div key={insight.title} variants={itemVariants}>
                            <Card className="rounded-2xl soft-shadow border-0 h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-brand-charcoal">{insight.title}</CardTitle>
                                    <Icon className="h-5 w-5 text-brand-charcoal" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-brand-deep-indigo">{insight.value}</div>
                                    <p className={`text-xs ${insight.changeColor}`}>{insight.change}</p>
                                    {insight.progress && <Progress value={insight.progress} className="h-2 mt-2" indicatorClassName="bg-brand-primary-blue" />}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )})
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                 {isLoading ? <Skeleton className="h-52 w-full rounded-2xl" /> :
                <Card className="rounded-2xl soft-shadow border-0">
                    <CardHeader>
                        <CardTitle className="text-brand-deep-indigo">Actionable Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendations.map(rec => (
                            <div key={rec.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-brand-light-gray/80 rounded-lg gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-brand-sky/20 rounded-full">
                                        <BookOpen className="h-6 w-6 text-brand-sky" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-deep-indigo">{rec.title}</p>
                                        <p className="text-sm text-brand-charcoal">{rec.description}</p>
                                    </div>
                                </div>
                                <Button className="w-full sm:w-auto" variant="outline" onClick={() => handleAction(rec.action)}>
                                    {rec.action} <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                }
            </motion.div>
        </div>
    );
};

export default InsightsAndRecommendations;