import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Survey = () => {
    const { toast } = useToast();

    const handleTakeSurvey = () => {
        toast({
            title: "🚧 Feature in development",
            description: "The survey will be available soon. Thank you for your patience!",
        });
    };

    return (
        <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="rounded-2xl soft-shadow border-0 text-center">
                <CardHeader className="pt-10">
                    <div className="mx-auto bg-brand-purple/10 p-4 rounded-full w-fit">
                        <FileText className="h-10 w-10 text-brand-purple" />
                    </div>
                    <CardTitle className="text-3xl text-brand-deep-indigo mt-4">Entry Psychosocial Conditions Survey</CardTitle>
                    <CardDescription className="text-lg text-brand-charcoal max-w-lg mx-auto pt-2">
                        As part of our commitment to your well-being and regulatory compliance, please complete this survey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-10">
                    <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90" onClick={handleTakeSurvey}>
                        Organize & Take Survey <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Survey;