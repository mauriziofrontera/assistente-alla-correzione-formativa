
import React, { useState, useCallback } from 'react';
import type { FeedbackData } from '../types';
import { ClipboardIcon, CheckIcon } from './icons/Icons';

interface FeedbackCardProps {
  feedback: FeedbackData;
}

const FeedbackSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-emerald-800 mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatFeedbackForCopy = useCallback((data: FeedbackData): string => {
    let text = "Feedback Formativo per lo Studente\n\n";
    text += "------------------------------------\n\n";

    if (data.punti_di_forza?.length > 0) {
      text += "*Punti di Forza:*\n";
      data.punti_di_forza.forEach(item => text += `- ${item}\n`);
      text += "\n";
    }

    if (data.miglioramento_contenuto?.length > 0) {
      text += "*Aree di Miglioramento (Contenuto e Argomentazione):*\n";
      data.miglioramento_contenuto.forEach(item => text += `- ${item}\n`);
      text += "\n";
    }

    if (data.miglioramento_struttura?.length > 0) {
      text += "*Aree di Miglioramento (Struttura e Coesione):*\n";
      data.miglioramento_struttura.forEach(item => text += `- ${item}\n`);
      text += "\n";
    }
    
    if (data.suggerimenti_linguistici?.length > 0) {
      text += "*Suggerimenti Linguistici e Stilistici (Esempi):*\n";
      data.suggerimenti_linguistici.forEach(item => text += `- ${item}\n`);
      text += "\n";
    }

    return text.trim();
  }, []);

  const handleCopy = useCallback(() => {
    const feedbackText = formatFeedbackForCopy(feedback);
    navigator.clipboard.writeText(feedbackText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [feedback, formatFeedbackForCopy]);

  return (
    <div className="animate-fade-in w-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopy}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-200 ${
            isCopied 
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
            : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {isCopied ? (
            <>
              <CheckIcon className="h-5 w-5 mr-2" /> Copiato!
            </>
          ) : (
            <>
              <ClipboardIcon className="h-5 w-5 mr-2" /> Copia Feedback
            </>
          )}
        </button>
      </div>

      <div>
        <FeedbackSection title="Punti di Forza" items={feedback.punti_di_forza} />
        <FeedbackSection title="Aree di Miglioramento (Contenuto e Argomentazione)" items={feedback.miglioramento_contenuto} />
        <FeedbackSection title="Aree di Miglioramento (Struttura e Coesione)" items={feedback.miglioramento_struttura} />
        <FeedbackSection title="Suggerimenti Linguistici e Stilistici (Esempi)" items={feedback.suggerimenti_linguistici} />
      </div>
    </div>
  );
};
