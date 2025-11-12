import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/pre-onboarding/CourseCard';

const courses = [
  {
    id: 'sig',
    title: 'Introduction to SIG',
    description: 'What is the Integrated Management System?',
    imageDescription: 'Hands holding colorful gears connecting with each other',
  },
  {
    id: 'hseq',
    title: 'Principles of HSEQ',
    description: 'What is occupational health and safety?',
    imageDescription: 'Construction workers with hard hats reviewing a document',
  },
  {
    id: 'environmental',
    title: 'Environmental Management',
    description: 'What is Environmental Management?',
    imageDescription: 'Hands holding a small globe and a small tree',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const IntroPolicies = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-center text-brand-deep-indigo mb-8">
        Pre-Onboarding Course Catalog
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IntroPolicies;