import React from 'react';
import { BookUser } from 'lucide-react';
import FaqReglamento from '@/components/reglamento/FaqReglamento';
import ChatNormativa from '@/components/reglamento/ChatNormativa';

const DutiesAndRights = () => {
  return (
    <div className="w-full">
        <header className="mb-12 text-center">
          <div className="inline-block bg-brand-primary-blue/10 p-4 rounded-full mb-4">
            <BookUser className="h-10 w-10 text-brand-primary-blue" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-deep-indigo tracking-tight">
            Duties and Rights of the Employee
          </h1>
          <p className="mt-4 text-lg text-brand-charcoal max-w-3xl mx-auto">
            Find quick answers to your questions and explore the company's regulations interactively.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white p-8 rounded-2xl soft-shadow border border-gray-100">
            <FaqReglamento />
          </div>
          <div className="lg:sticky top-28">
            <ChatNormativa />
          </div>
        </div>
    </div>
  );
};

export default DutiesAndRights;