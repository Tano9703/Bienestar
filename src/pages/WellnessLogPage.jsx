import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { wellnessSections } from '@/data/wellnessData';
import MoodTracker from '@/components/wellness/MoodTracker';
import ReflectionEntries from '@/components/wellness/ReflectionEntries';
import WellnessGoals from '@/components/wellness/WellnessGoals';
import InsightsAndRecommendations from '@/components/wellness/InsightsAndRecommendations';
import SettingsSection from '@/components/wellness/SettingsSection';
import Seo from '@/components/Seo';

const WellnessLogPage = () => {
    let { sectionId } = useParams();
    if (!sectionId) {
        sectionId = 'mood-tracker';
    }

    const currentSection = wellnessSections.find(s => s.id === sectionId);

    if (!currentSection) {
        return <Navigate to="/wellness-log/mood-tracker" replace />;
    }

    const renderSectionContent = () => {
        switch (sectionId) {
            case 'mood-tracker':
                return <MoodTracker />;
            case 'reflection-entries':
                return <ReflectionEntries />;
            case 'wellness-goals':
                return <WellnessGoals />;
            case 'insights':
                return <InsightsAndRecommendations />;
            case 'integrations':
            case 'privacy':
                return <SettingsSection section={currentSection} />;
            default:
                return <MoodTracker />;
        }
    };

    return (
        <>
            <Seo 
                title={`${currentSection.title} | Wellness Log`}
                description={currentSection.description}
                path={`/wellness-log/${sectionId}`}
            />
            {renderSectionContent()}
        </>
    );
};

export default WellnessLogPage;