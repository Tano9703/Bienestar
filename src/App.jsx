import React, { Suspense } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import { Toaster } from "@/components/ui/toaster";
    import MainLayout from '@/layouts/MainLayout';
    import WellnessLayout from '@/layouts/WellnessLayout';
    import PreOnboardingLayout from '@/layouts/PreOnboardingLayout';

    const HomePage = React.lazy(() => import('@/pages/HomePage'));
    const PlaceholderPage = React.lazy(() => import('@/pages/PlaceholderPage'));
    const WellnessLogPage = React.lazy(() => import('@/pages/WellnessLogPage'));
    const MentorNetworkPage = React.lazy(() => import('@/pages/MentorNetworkPage'));
    const PreOnboardingPage = React.lazy(() => import('@/pages/PreOnboardingPage'));
    const CourseDetailPage = React.lazy(() => import('@/pages/CourseDetailPage'));
    const CultureBasedInductionPage = React.lazy(() => import('@/pages/CultureBasedInductionPage'));

    const App = () => {
      const loadingFallback = (
        <div className="w-full h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-primary-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-brand-deep-indigo font-semibold">Loading...</p>
          </div>
        </div>
      );

      return (
        <>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={loadingFallback}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/mentor-network" element={<MentorNetworkPage />} />
                  <Route path="/onboarding" element={<CultureBasedInductionPage />} />
                  <Route path="/culture-onboarding" element={<CultureBasedInductionPage />} />
                  <Route path="/feed" element={<HomePage />} />
                  <Route path="/calendar" element={<HomePage />} />
                  <Route path="/profile" element={<HomePage />} />
                </Route>
                <Route path="/wellness-log" element={<WellnessLayout />}>
                   <Route index element={<WellnessLogPage />} />
                   <Route path=":sectionId" element={<WellnessLogPage />} />
                </Route>
                <Route path="/pre-onboarding" element={<PreOnboardingLayout />}>
                   <Route index element={<PreOnboardingPage />} />
                   <Route path=":sectionId" element={<PreOnboardingPage />} />
                   <Route path="course/:courseId" element={<CourseDetailPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </>
      );
    };

    export default App;