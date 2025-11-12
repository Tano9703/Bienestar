import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Award, Puzzle, Podcast, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const FeatureCard = ({ icon, title, description, color, onClick }) => (
  <motion.div
    variants={itemVariants}
    className="group relative p-4 rounded-xl border bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-primary-blue cursor-pointer"
    onClick={onClick}
    aria-label={`Access ${title}`}
  >
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${color.bg}`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${color.text}` })}
      </div>
      <div className="flex-grow">
        <h4 className="font-bold text-md text-brand-deep-indigo">{title}</h4>
        <p className="text-sm text-brand-charcoal mt-1">{description}</p>
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-400 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const DigitalKit = () => {
  const { toast } = useToast();

  const handleAction = (featureName) => {
    toast({
      title: `🚧 ${featureName} is on its way!`,
      description: "This feature is not implemented yet, but it will be available very soon!",
    });
  };

  const features = [
    {
      icon: <Award />,
      title: "Gamified Modules",
      description: "Learn the company’s mission and values in a fun, interactive way.",
      color: { bg: 'bg-orange-100', text: 'text-orange-500' },
      action: () => handleAction("Gamified Modules"),
    },
    {
      icon: <Puzzle />,
      title: "Interactive Quiz",
      description: "Test your knowledge about your new company.",
      color: { bg: 'bg-green-100', text: 'text-brand-green' },
      action: () => handleAction("Interactive Quiz"),
    },
    {
      icon: <Podcast />,
      title: "Internal Podcasts",
      description: "Listen to company leaders share their experiences.",
      color: { bg: 'bg-red-100', text: 'text-red-500' },
      action: () => handleAction("Internal Podcasts"),
    },
  ];

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="h-full soft-shadow flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-brand-deep-indigo">New Talent Digital Kit</CardTitle>
          <CardDescription className="text-brand-charcoal">Equip yourself with everything you need for your journey.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-around space-y-4">
          {features.map((opt) => (
            <FeatureCard
              key={opt.title}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              color={opt.color}
              onClick={opt.action}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DigitalKit;