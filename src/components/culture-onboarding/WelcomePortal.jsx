import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayCircle, Rocket, Trophy, Globe, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VideoModal from '@/components/culture-onboarding/VideoModal';

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

const timelineEventsData = [
  { icon: <Rocket className="w-5 h-5 text-brand-primary-blue" />, title: 'Foundation', description: 'The beginning of a great journey.' },
  { icon: <Trophy className="w-5 h-5 text-brand-primary-blue" />, title: 'First Major Project', description: 'First big milestone.' },
  { icon: <Globe className="w-5 h-5 text-brand-primary-blue" />, title: 'Global Expansion', description: 'Entering new markets.' },
  { icon: <UserPlus className="w-5 h-5 text-brand-primary-blue" />, title: 'Your Arrival', description: 'You have joined the team!' },
];

const successStoriesData = [
  { name: 'Ana', initials: 'An' },
  { name: 'Carlos', initials: 'Ca' },
  { name: 'Sofia', initials: 'So' },
];

const WelcomePortal = () => {
    const { toast } = useToast();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const handleAction = (featureName) => {
        toast({
            title: `🚧 ${featureName} is on its way!`,
            description: "This feature is not implemented yet, but it will be available very soon!",
        });
    };

  return (
    <>
      <motion.div variants={itemVariants} className="h-full">
        <Card className="h-full soft-shadow flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-brand-deep-indigo">Personalized Welcome Portal</CardTitle>
            <CardDescription className="text-brand-charcoal">Your journey begins here! Welcome aboard!</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between space-y-6">
            <motion.div 
                variants={itemVariants} 
                className="relative rounded-lg overflow-hidden group cursor-pointer" 
                onClick={() => setIsVideoOpen(true)}
            >
              <img  alt="CEO giving a welcome message" className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1493882552576-fce827c6161e" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
                <p className="absolute bottom-2 text-white font-semibold text-sm">CEO Message</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-brand-deep-indigo mb-3">Interactive Timeline</h4>
              <div className="relative pl-5 border-l-2 border-brand-primary-blue/20 space-y-5">
                {timelineEventsData.map((event, i) => (
                  <div key={i} className="relative cursor-pointer group" onClick={() => handleAction('Timeline Details')}>
                    <div className="absolute -left-[30px] top-0 w-10 h-10 bg-brand-light-gray rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                        {event.icon}
                    </div>
                    <div className="pl-4">
                        <p className="font-medium text-sm text-brand-charcoal group-hover:text-brand-primary-blue">{event.title}</p>
                        <p className="text-xs text-brand-charcoal/70">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-brand-deep-indigo mb-3">Success Stories</h4>
              <div className="flex gap-4">
                {successStoriesData.map((story) => (
                  <div key={story.name} className="flex-shrink-0 text-center space-y-1 cursor-pointer" onClick={() => handleAction(`${story.name}'s Story`)}>
                    <Avatar className="w-14 h-14 mx-auto border-2 border-brand-sky/50 hover:border-brand-sky transition-colors">
                      <AvatarFallback>{story.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="A Message from Our CEO"
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </>
  );
};

export default WelcomePortal;