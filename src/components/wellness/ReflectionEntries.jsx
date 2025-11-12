import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Trophy, Zap, Star, PlusCircle, BookOpen, Smile, Tag, Lock, Send } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const sampleData = {
  kpis: { weeklyGratitude: 4, challengesOvercome: 7, keyLearnings: 4, recentAchievements: 5 },
  activityLast7Days: [
    { date: "2025-08-06", gratitude: 1, challenges: 2, learnings: 0, achievements: 1 },
    { date: "2025-08-07", gratitude: 0, challenges: 1, learnings: 1, achievements: 0 },
    { date: "2025-08-08", gratitude: 2, challenges: 0, learnings: 0, achievements: 1 },
    { date: "2025-08-09", gratitude: 1, challenges: 1, learnings: 2, achievements: 0 },
    { date: "2025-08-10", gratitude: 0, challenges: 1, learnings: 0, achievements: 1 },
    { date: "2025-08-11", gratitude: 0, challenges: 1, learnings: 1, achievements: 1 },
    { date: "2025-08-12", gratitude: 1, challenges: 1, learnings: 0, achievements: 1 }
  ],
  history: [
    { relative: "0 days ago", date: "Tuesday, August 12", preview: "Landed the new client account after a tough negotiation.", category: "Recent Achievements", icon: Star, color: "text-purple-600", bg: "bg-purple-100" },
    { relative: "1 day ago", date: "Monday, August 11", preview: "Finally understood the new state management library.", category: "Key Learnings", icon: Zap, color: "text-blue-600", bg: "bg-blue-100" },
    { relative: "2 days ago", date: "Sunday, August 10", preview: "Feeling thankful for my supportive team this week.", category: "Weekly Gratitude", icon: Heart, color: "text-pink-600", bg: "bg-pink-100" }
  ]
};

const kpiData = [
    { title: 'Weekly Gratitude', value: sampleData.kpis.weeklyGratitude, icon: Heart, color: 'bg-pink-100 text-pink-600', caption: 'total entries' },
    { title: 'Challenges Overcome', value: sampleData.kpis.challengesOvercome, icon: Trophy, color: 'bg-yellow-100 text-yellow-600', caption: 'total entries' },
    { title: 'Key Learnings', value: sampleData.kpis.keyLearnings, icon: Zap, color: 'bg-blue-100 text-blue-600', caption: 'total entries' },
    { title: 'Recent Achievements', value: sampleData.kpis.recentAchievements, icon: Star, color: 'bg-purple-100 text-purple-600', caption: 'total entries' },
];

const chartLabels = sampleData.activityLast7Days.map(d => new Date(d.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));
const chartData = {
    labels: chartLabels,
    datasets: [
        { label: 'Gratitude', data: sampleData.activityLast7Days.map(d => d.gratitude), backgroundColor: '#FBCFE8', barThickness: 15, borderRadius: 4 },
        { label: 'Challenges', data: sampleData.activityLast7Days.map(d => d.challenges), backgroundColor: '#FDE68A', barThickness: 15, borderRadius: 4 },
        { label: 'Learnings', data: sampleData.activityLast7Days.map(d => d.learnings), backgroundColor: '#BFDBFE', barThickness: 15, borderRadius: 4 },
        { label: 'Achievements', data: sampleData.activityLast7Days.map(d => d.achievements), backgroundColor: '#E9D5FF', barThickness: 15, borderRadius: 4 },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
        legend: { position: 'bottom', align: 'start', labels: { boxWidth: 12, padding: 20, usePointStyle: true, pointStyle: 'circle' } },
        title: { display: false }
    },
    scales: { 
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, beginAtZero: true, grid: { drawBorder: false }, ticks: { stepSize: 2 } } 
    },
};

const NewReflectionModal = ({ children, handleAction }) => (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl">
            <DialogHeader>
                <DialogTitle className="text-brand-deep-indigo">New Reflection</DialogTitle>
                <DialogDescription>Use a template or start from scratch to capture your thoughts.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                 <Select defaultValue="blank">
                    <SelectTrigger><SelectValue placeholder="Select a template" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blank"><BookOpen className="inline-block mr-2 h-4 w-4" />Blank</SelectItem>
                        <SelectItem value="gratitude"><Heart className="inline-block mr-2 h-4 w-4" />Gratitude</SelectItem>
                        <SelectItem value="wins"><Trophy className="inline-block mr-2 h-4 w-4" />Wins</SelectItem>
                        <SelectItem value="learnings"><Zap className="inline-block mr-2 h-4 w-4" />Learnings</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Title (optional)" />
                <Textarea placeholder="What's on your mind?" className="min-h-[150px]" />
                <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-brand-charcoal" /><span className="text-sm font-medium">Categories:</span>
                    <Button variant="outline" size="xs" className="rounded-full">Gratitude</Button>
                    <Button variant="outline" size="xs" className="rounded-full">Challenge</Button>
                    <Button variant="outline" size="xs" className="rounded-full">Learning</Button>
                    <Button variant="outline" size="xs" className="rounded-full">Achievement</Button>
                </div>
                <div className="flex items-center gap-2">
                    <Smile className="h-4 w-4 text-brand-charcoal" /><span className="text-sm font-medium">Sentiment:</span>
                    <Button variant="ghost" size="icon" className="text-green-500 text-2xl">🙂</Button>
                </div>
                 <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-brand-charcoal" /><span className="text-sm font-medium">Privacy:</span>
                    <Select defaultValue="private"><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="private">Private</SelectItem><SelectItem value="mentor">Share with Mentor</SelectItem></SelectContent></Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                <Button type="button" variant="outline" onClick={() => handleAction('Save Draft')}>Save Draft</Button>
                <Button type="submit" onClick={() => handleAction('Publish')}> <Send className="h-4 w-4 mr-2" /> Publish</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const ReflectionEntries = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (title) => {
        toast({ title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀` });
    };

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <div className="space-y-8 pb-24 md:pb-8">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" animate={isLoading ? "hidden" : "visible"}>
                {isLoading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />) :
                    kpiData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div key={item.title} variants={itemVariants}>
                                <Card className={`rounded-2xl border-0 h-full ${item.color.split(' ')[0]}`}>
                                    <CardContent className="p-4 flex flex-col justify-between h-full text-left">
                                        <div className="flex justify-end"><Icon className={`h-6 w-6 ${item.color.split(' ')[1]} opacity-70`} /></div>
                                        <div>
                                            <p className="text-4xl font-bold text-brand-deep-indigo">{item.value}</p>
                                            <p className={`font-semibold ${item.color.split(' ')[1]}`}>{item.title}</p>
                                            <p className="text-sm text-brand-charcoal">{item.caption}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })
                }
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div className="lg:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <Card className="rounded-2xl soft-shadow border-0 h-full">
                         <CardHeader>
                            <CardTitle className="text-brand-deep-indigo">Recent Activity</CardTitle>
                            <CardDescription>Reflections in the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            {isLoading ? <Skeleton className="w-full h-full rounded-lg" /> : <Bar options={chartOptions} data={chartData} />}
                            <p className="sr-only">A bar chart showing reflection counts for the last 7 days, categorized by type.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div className="lg:col-span-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <Card className="rounded-2xl soft-shadow border-0 h-full">
                        <CardHeader><CardTitle className="text-brand-deep-indigo">Entry History</CardTitle></CardHeader>
                        <CardContent>
                            {isLoading ? <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}</div> :
                                <div className="space-y-4">
                                    {sampleData.history.length > 0 ? sampleData.history.map((entry, index) => {
                                        const Icon = entry.icon;
                                        return (
                                            <button key={index} onClick={() => handleAction('View Entry')} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className={`mt-1 p-2 ${entry.bg} rounded-full`}><Icon className={`h-5 w-5 ${entry.color}`} /></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-brand-deep-indigo">{entry.relative}</p>
                                                    <p className="text-xs text-brand-charcoal">{entry.date}</p>
                                                    <p className="text-sm text-brand-charcoal mt-1 truncate">{entry.preview}</p>
                                                </div>
                                            </button>
                                        )
                                    }) : (
                                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                            <p className="text-brand-charcoal">Create your first reflection.</p>
                                            <NewReflectionModal handleAction={handleAction}><Button variant="link">Start journaling</Button></NewReflectionModal>
                                        </div>
                                    )}
                                </div>
                            }
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t z-20">
                <NewReflectionModal handleAction={handleAction}>
                    <Button className="w-full rounded-full" size="lg"><PlusCircle className="h-5 w-5 mr-2" /> New Reflection</Button>
                </NewReflectionModal>
            </div>
        </div>
    );
};

export default ReflectionEntries;