import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqData = [
    {
        question: "What is the standard work schedule?",
        answer: "The standard work schedule is from 9:00 AM to 5:00 PM, Monday to Friday. However, we offer flexible hours depending on your role and team agreements."
    },
    {
        question: "How do I request vacation?",
        answer: "Vacation requests should be submitted through the HR portal at least two weeks in advance. Your manager will review and approve the request."
    },
    {
        question: "What is the dress code?",
        answer: "We have a business casual dress code. We trust you to dress appropriately for your workday. For client-facing meetings, more formal attire may be required."
    },
    {
        question: "What should I do if I am sick and cannot work?",
        answer: "If you are unable to work due to illness, please notify your manager as early as possible. For absences longer than two days, a medical certificate may be required."
    },
    {
        question: "Are there remote work opportunities?",
        answer: "Yes, we support a hybrid work model. Remote work policies and schedules can be discussed and arranged with your direct manager based on team and project needs."
    }
];

const FaqReglamento = () => {
    return (
        <div>
            <div className="flex items-center mb-6">
                <HelpCircle className="h-7 w-7 text-brand-primary-blue mr-3" />
                <h3 className="text-2xl font-bold text-brand-deep-indigo">Frequently Asked Questions</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-semibold text-brand-charcoal hover:text-brand-primary-blue">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-brand-charcoal/90">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FaqReglamento;