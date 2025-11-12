import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Youtube, Code, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import Seo from '@/components/Seo';

const courseData = {
  sig: { 
    title: 'Introduction to SIG', 
    description: 'What is the Integrated Management System?',
    objective: 'Understand the fundamentals of the Integrated Management System (IMS) and its importance for the organization, identifying its main components and benefits.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>The interactive <strong>HTML</strong> content about SIG will be displayed here.</p><p><em>(This is a placeholder)</em></p></div>',
  },
  hseq: { 
    title: 'Principles of HSEQ', 
    description: 'What is occupational health and safety?',
    objective: 'Learn the fundamental principles of Health, Safety, Environment, and Quality (HSEQ) and how they apply in the daily work environment.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>The interactive <strong>HTML</strong> content about HSEQ will be displayed here.</p><p><em>(This is a placeholder)</em></p></div>',
  },
  environmental: { 
    title: 'Environmental Management', 
    description: 'What is Environmental Management?',
    objective: 'Understand the importance of environmental management, company policies, and individual responsibilities to promote sustainability.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    embedContent: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background-color: #f9f9f9;"><p>The interactive <strong>HTML</strong> content about Environmental Management will be displayed here.</p><p><em>(This is a placeholder)</em></p></div>',
  },
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const course = courseData[courseId];

  const handleActionClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} is on its way!`,
      description: "This feature is not yet implemented, but it will be available very soon!",
    });
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Error 404</h1>
          <p className="text-lg text-gray-600 mb-8">Course not found</p>
          <Button onClick={() => navigate('/pre-onboarding')} className="bg-brand-primary-blue text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title={course.title} description={course.description} />
      <div className="bg-brand-light-gray min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <Button onClick={() => navigate('/pre-onboarding/intro-policies')} variant="ghost" className="mb-8 text-brand-primary-blue hover:bg-brand-primary-blue/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Catalog
          </Button>
          
          <Card className="overflow-hidden soft-shadow border-none rounded-2xl">
            <CardHeader className="bg-brand-primary-blue text-white p-6">
              <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
              <CardDescription className="text-white/80 text-lg">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-brand-deep-indigo flex items-center mb-4">
                  <Target className="mr-3 text-brand-primary-blue h-6 w-6" />
                  Learning Objective
                </h2>
                <p className="text-brand-charcoal text-base leading-relaxed">{course.objective}</p>
              </section>

              <div className="w-full h-px bg-gray-200"></div>

              <section>
                <h2 className="text-2xl font-semibold text-brand-deep-indigo flex items-center mb-4">
                  <Youtube className="mr-3 text-red-500 h-6 w-6" />
                  Introduction Video
                </h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md border">
                  <iframe
                    className="w-full h-full"
                    src={course.videoUrl}
                    title={`Introduction video for ${course.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>

              <div className="w-full h-px bg-gray-200"></div>

              <section>
                <h2 className="text-2xl font-semibold text-brand-deep-indigo flex items-center mb-4">
                  <Code className="mr-3 text-brand-indigo h-6 w-6" />
                  Interactive Content
                </h2>
                <div dangerouslySetInnerHTML={{ __html: course.embedContent }} />
              </section>

              <div className="w-full h-px bg-gray-200"></div>

              <section className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-brand-green hover:bg-brand-green/90" onClick={() => handleActionClick('The course test')}>
                  <FileText className="mr-2 h-5 w-5" />
                  Take Course Test
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleActionClick('Content download')}>
                  <Download className="mr-2 h-5 w-5" />
                  Download Content
                </Button>
              </section>

            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;