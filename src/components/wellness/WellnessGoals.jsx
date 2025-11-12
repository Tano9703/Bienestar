import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle, User, Users, Building, Flag, Calendar, Zap, Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sampleGoals = [
    { title: "Practice mindfulness for 10 mins daily", description: "Use a guided meditation app.", category: "Personal", progress: 60, dueDate: "2025-08-30", status: "in-progress" },
    { title: "Complete advanced React course", description: "Finish all modules and the final project.", category: "Personal", progress: 25, dueDate: "2025-09-15", status: "in-progress" },
    { title: "Ensure Q3 project delivery", description: "Coordinate with the team to meet the deadline.", category: "Work Group", progress: 75, dueDate: "2025-09-30", status: "in-progress" },
    { title: "Present at the next all-hands", description: "Share the team's recent successes.", category: "Work Group", progress: 100, dueDate: "2025-07-25", status: "completed" },
    { title: "Increase department efficiency by 5%", description: "Automate two manual processes.", category: "Organizational", progress: 50, dueDate: "2025-12-31", status: "in-progress" },
    { title: "Exceed Q2 sales target by 10%", description: "Focus on upselling to existing clients.", category: "Organizational", progress: 20, dueDate: "2025-06-30", status: "overdue" },
];

const GoalCard = ({ goal, handleAction }) => {
    const getStatusInfo = () => {
        if (goal.status === "completed") return { text: "Completed", bg: "bg-green-100", textColor: "text-green-700", indicator: "bg-brand-green" };
        if (goal.status === "overdue") return { text: "Overdue", bg: "bg-red-100", textColor: "text-red-700", indicator: "bg-red-500" };
        return { text: "In Progress", bg: "bg-blue-100", textColor: "text-blue-700", indicator: "bg-brand-primary-blue" };
    };
    const statusInfo = getStatusInfo();

    return (
        <Card className="rounded-2xl soft-shadow border-0 h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-brand-deep-indigo leading-tight">{goal.title}</CardTitle>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusInfo.bg} ${statusInfo.textColor}`}>{statusInfo.text}</span>
                </div>
                <CardDescription className="text-brand-charcoal pt-1">{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center text-sm mb-1 text-brand-charcoal">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} indicatorClassName={statusInfo.indicator} />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-brand-charcoal flex items-center gap-2"><Calendar className="h-4 w-4" /> Due: {new Date(goal.dueDate).toLocaleDateString()}</p>
                <div>
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("Edit Goal")}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("Delete Goal")}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const CreateGoalModal = ({ children, handleAction }) => (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl">
            <DialogHeader>
                <DialogTitle className="text-brand-deep-indigo">Create a New Goal</DialogTitle>
                <DialogDescription>Define your target and track your progress.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input placeholder="Goal Title" />
                <Textarea placeholder="Short Description" />
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="team">Work Group</SelectItem>
                        <SelectItem value="org">Organizational</SelectItem>
                    </SelectContent>
                </Select>
                 <Input type="date" placeholder="Due Date" />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                <Button type="submit" onClick={() => handleAction('Save Goal')}>Save Goal</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const WellnessGoals = () => {
    const { toast } = useToast();
    const handleAction = (action) => {
        toast({
            title: `🚧 ${action} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const filters = [
        { value: 'Personal', icon: User },
        { value: 'Work Group', icon: Users },
        { value: 'Organizational', icon: Building },
    ];

    return (
        <div className="space-y-6">
            <Tabs defaultValue="Personal" className="w-full">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <TabsList className="grid w-full grid-cols-3 md:w-auto">
                        {filters.map(filter => {
                            const Icon = filter.icon;
                            return (
                                <TabsTrigger key={filter.value} value={filter.value}>
                                    <Icon className="mr-2 h-4 w-4 hidden sm:inline-block" />{filter.value}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <CreateGoalModal handleAction={handleAction}>
                        <Button className="w-full md:w-auto">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Goal
                        </Button>
                    </CreateGoalModal>
                </div>
                
                {filters.map(filter => (
                    <TabsContent key={filter.value} value={filter.value}>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {sampleGoals.filter(g => g.category === filter.value).map(goal => (
                                <motion.div key={goal.title} variants={itemVariants}>
                                    <GoalCard goal={goal} handleAction={handleAction} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default WellnessGoals;