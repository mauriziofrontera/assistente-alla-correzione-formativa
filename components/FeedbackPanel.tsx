
import React from 'react';
import type { FeedbackData } from '../types';
import { FeedbackCard } from './FeedbackCard';
import { BookOpenIcon, ExclamationTriangleIcon } from './icons/Icons';

interface FeedbackPanelProps {
  isLoading: boolean;
  error: string | null;
  feedback: FeedbackData | null;
}

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
    <p className="text-lg font-medium">Analisi in corso...</p>
    <p className="text-sm">Il modello sta leggendo e valutando il testo.</p>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8 border-2 border-dashed border-gray-300 rounded-lg">
    <BookOpenIcon className="w-16 h-16 mb-4" />
    <p className="text-lg font-medium text-gray-600">Il feedback apparirà qui</p>
    <p className="text-sm">Incolla un testo e avvia l'analisi per iniziare.</p>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center text-red-700 p-8 bg-red-50 border border-red-200 rounded-lg">
    <ExclamationTriangleIcon className="w-16 h-16 mb-4 text-red-500" />
    <p className="text-lg font-bold">Oops! Qualcosa è andato storto.</p>
    <p className="text-sm mt-1">{message}</p>
  </div>
);

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ isLoading, error, feedback }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Analisi Formativa Generata</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px] flex flex-col justify-center">
        {isLoading && <LoadingState />}
        {error && !isLoading && <ErrorState message={error} />}
        {feedback && !isLoading && !error && <FeedbackCard feedback={feedback} />}
        {!isLoading && !error && !feedback && <EmptyState />}
      </div>
    </div>
  );
};
