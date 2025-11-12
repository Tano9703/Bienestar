import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const checklistData = [
    { id: 'profile', label: 'Complete profile information' },
    { id: 'computer', label: 'Configure work computer' },
    { id: 'manual', label: 'Review employee manual' },
];

const PreparationDashboard = () => {
    const { toast } = useToast();
    const [checkedItems, setCheckedItems] = useState(() => {
        try {
            const saved = localStorage.getItem('onboardingChecklist');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('onboardingChecklist', JSON.stringify(checkedItems));
        } catch (error) {
            console.error("Could not save checklist to localStorage", error);
        }
    }, [checkedItems]);
    
    const handleCheckChange = (id) => {
        setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
    };
    
    const handleAction = (featureName) => {
        toast({
            title: `🚧 ${featureName} is on its way!`,
            description: "This feature is not implemented yet, but it will be available very soon!",
        });
    };

    const calendarItems = [
        { day: 'Monday', task: 'Welcome & office tour.' },
        { day: 'Tuesday', task: 'Team meeting.' },
        { day: 'Wednesday', task: 'Tools training.' },
    ];

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="h-full soft-shadow flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-brand-deep-indigo">Preparation Dashboard</CardTitle>
          <CardDescription className="text-brand-charcoal">Organize your first days and weeks with us.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between space-y-6">
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><CheckSquare className="w-5 h-5 text-brand-primary-blue" /> Checklist</h4>
            <div className="space-y-3">
              {checklistData.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-light-gray/50 transition-colors">
                  <Checkbox 
                    id={item.id}
                    checked={!!checkedItems[item.id]}
                    onCheckedChange={() => handleCheckChange(item.id)}
                  />
                  <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow cursor-pointer">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-brand-primary-blue" /> Essential Documents</h4>
            <Button variant="outline" className="w-full justify-between" onClick={() => handleAction('Document Access')}>
              Access & Sign Documents
              <ArrowRight className="w-4 h-4"/>
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold flex items-center gap-2 mb-3"><Calendar className="w-5 h-5 text-brand-primary-blue" /> First Weeks Calendar</h4>
            <div className="p-4 bg-brand-light-gray rounded-lg text-sm space-y-2">
              {calendarItems.map(item => (
                <div key={item.day} className="flex">
                    <p className="w-24 font-semibold text-brand-charcoal">{item.day}:</p>
                    <p className="text-brand-charcoal/80">{item.task}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PreparationDashboard;