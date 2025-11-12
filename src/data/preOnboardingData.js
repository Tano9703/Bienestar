import {
    BookOpen,
    ShieldCheck,
    FileText,
    Users,
} from 'lucide-react';

export const preOnboardingSections = [
    {
        id: 'intro-policies',
        title: 'Intro Policies',
        description: 'Explore the course catalog for your pre-onboarding.',
        icon: BookOpen,
    },
    {
        id: 'duties-rights',
        title: 'Duties & Rights',
        description: 'Understand your responsibilities and rights as an employee.',
        icon: ShieldCheck,
    },
    {
        id: 'survey',
        title: 'Survey',
        description: 'Complete the required entry surveys.',
        icon: FileText,
    },
    {
        id: 'organizational-structure',
        title: 'Organizational Structure',
        description: 'Get to know the team and company structure.',
        icon: Users,
    },
];