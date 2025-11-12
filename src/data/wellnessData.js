import {
    Smile,
    BookOpen,
    Target,
    BarChart3,
    Zap,
    ShieldCheck,
} from 'lucide-react';

export const wellnessSections = [
    {
        id: 'mood-tracker',
        title: 'Mood Tracker',
        description: 'Capture and visualize your daily mood.',
        icon: Smile,
    },
    {
        id: 'reflection-entries',
        title: 'Reflection Entries',
        description: 'Go deeper with journaling templates and feedback.',
        icon: BookOpen,
    },
    {
        id: 'wellness-goals',
        title: 'Wellness Goals',
        description: 'Define and track your personal wellness targets.',
        icon: Target,
    },
    {
        id: 'insights',
        title: 'Insights & Recommendations',
        description: 'Personalized stats and suggestions for your wellbeing journey.',
        icon: BarChart3,
    },
    {
        id: 'integrations',
        title: 'Integrations & Notifications',
        description: 'Connect apps and manage how we stay in touch.',
        icon: Zap,
        content: {
            notifications: [
                { id: 'daily-mood', label: 'Daily mood capture reminder', checked: true },
                { id: 'weekly-reflection', label: 'Weekly reflection prompt', checked: true },
                { id: 'goal-checkin', label: 'Goal check-in reminders', checked: false },
            ],
            integrations: ['Slack', 'Google Calendar', 'Microsoft Teams'],
        }
    },
    {
        id: 'privacy',
        title: 'Privacy & Security',
        description: 'Your data is safe, secure, and under your control.',
        icon: ShieldCheck,
        content: {
            policy: 'At CrossLearning, we are committed to protecting your privacy. Your personal wellness data is encrypted and will never be shared with third parties without your explicit consent. You have full control over your data, including the ability to export or delete it at any time.',
            privacyOptions: [
                { label: 'Export my wellness log', action: 'Export Data', variant: 'outline' },
                { label: 'Delete my wellness account', action: 'Delete Account', variant: 'destructive' },
            ],
        }
    },
];