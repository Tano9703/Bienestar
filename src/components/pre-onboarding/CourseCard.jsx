import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartCourse = () => {
    navigate(`/pre-onboarding/course/${course.id}`);
  };
  
  const handleShowDate = () => {
    toast({
      title: "Closing Date: Not yet defined",
      description: "The closing date for this course will be announced soon.",
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl soft-shadow overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-full h-48">
        <img  className="w-full h-full object-cover" alt={course.imageDescription} src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-deep-indigo mb-2">{course.title}</h3>
        <p className="text-brand-charcoal mb-4 flex-grow">{course.description}</p>
        
        <div className="flex flex-col space-y-2 mt-auto">
            <Button
                variant="ghost"
                className="p-0 h-auto justify-start text-brand-charcoal hover:text-brand-primary-blue text-sm"
                onClick={handleShowDate}
            >
                <Calendar size={16} className="mr-2" /> Closing Date
            </Button>
            <Button
                className="w-full mt-2"
                onClick={handleStartCourse}
            >
                Start Course <ArrowRight size={16} className="ml-2" />
            </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;