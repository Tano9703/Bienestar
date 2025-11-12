import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { preOnboardingSections } from '@/data/preOnboardingData';
import IntroPolicies from '@/components/pre-onboarding/IntroPolicies';
import DutiesAndRights from '@/components/pre-onboarding/DutiesAndRights';
import Survey from '@/components/pre-onboarding/Survey';
import OrganizationalStructure from '@/components/pre-onboarding/OrganizationalStructure';
import Seo from '@/components/Seo';

const PreOnboardingPage = () => {
    let { sectionId } = useParams();
    if (!sectionId) {
        sectionId = 'intro-policies';
    }

    const currentSection = preOnboardingSections.find(s => s.id === sectionId);

    if (!currentSection) {
        return <Navigate to="/pre-onboarding/intro-policies" replace />;
    }

    const renderSectionContent = () => {
        switch (sectionId) {
            case 'intro-policies':
                return <IntroPolicies />;
            case 'duties-rights':
                return <DutiesAndRights />;
            case 'survey':
                return <Survey />;
            case 'organizational-structure':
                return <OrganizationalStructure />;
            default:
                return <IntroPolicies />;
        }
    };

    return (
        <>
            <Seo 
                title={`${currentSection.title} | Pre-Onboarding`}
                description={currentSection.description}
                path={`/pre-onboarding/${sectionId}`}
            />
            {renderSectionContent()}
        </>
    );
};

export default PreOnboardingPage;