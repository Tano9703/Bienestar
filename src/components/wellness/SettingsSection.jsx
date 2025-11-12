import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const SettingsSection = ({ section }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [section]);

    const handleAction = (action) => {
        toast({
            title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const renderContent = () => {
        if (!section.content) return null;

        if (isLoading) {
            return (
                <div className="space-y-6">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
            )
        }

        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {section.content.notifications && (
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl soft-shadow border-0">
                            <CardHeader>
                                <CardTitle className="text-brand-deep-indigo">Notifications</CardTitle>
                                <CardDescription>Manage how you receive alerts.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {section.content.notifications.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-brand-light-gray/80 rounded-lg">
                                        <Label htmlFor={item.id} className="flex-grow text-brand-charcoal">{item.label}</Label>
                                        <Switch id={item.id} defaultChecked={item.checked} />
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button onClick={() => handleAction('Save Notification Settings')}>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
                {section.content.integrations && (
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl soft-shadow border-0">
                            <CardHeader>
                                <CardTitle className="text-brand-deep-indigo">Integrations</CardTitle>
                                <CardDescription>Connect with your favorite apps.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {section.content.integrations.map(item => (
                                     <div key={item} className="flex items-center justify-between p-4 bg-brand-light-gray/80 rounded-lg">
                                        <p className="font-medium text-brand-charcoal">{item}</p>
                                        <Button size="sm" onClick={() => handleAction(`Connect ${item}`)}>Connect</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                {section.content.policy && (
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl soft-shadow border-0">
                            <CardHeader>
                                <CardTitle className="text-brand-deep-indigo">Privacy Policy</CardTitle>
                                <CardDescription>Our commitment to your data privacy.</CardDescription>
                            </CardHeader>
                            <CardContent className="prose prose-sm max-w-none text-brand-charcoal">
                               <p>{section.content.policy}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                {section.content.privacyOptions && (
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl soft-shadow border-0">
                            <CardHeader>
                                <CardTitle className="text-brand-deep-indigo">Data Management</CardTitle>
                                <CardDescription>Manage your personal information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {section.content.privacyOptions.map(item => (
                                     <div key={item.action} className="flex items-center justify-between p-4 bg-brand-light-gray/80 rounded-lg">
                                        <p className="font-medium text-brand-charcoal">{item.label}</p>
                                        <Button variant={item.variant} size="sm" onClick={() => handleAction(item.action)}>{item.action}</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            {renderContent()}
        </div>
    );
};

export default SettingsSection;