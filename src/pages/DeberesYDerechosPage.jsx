import React from 'react';
import { BookUser } from 'lucide-react';
import FaqReglamento from '@/components/reglamento/FaqReglamento';
import ChatNormativa from '@/components/reglamento/ChatNormativa';

const DeberesYDerechosPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-12 text-center">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
            <BookUser className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Deberes y Derechos del Colaborador
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas rápidas a tus dudas y explora la normativa de la empresa de forma interactiva.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <FaqReglamento />
          </div>
          <div className="lg:sticky top-8">
            <ChatNormativa />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeberesYDerechosPage;