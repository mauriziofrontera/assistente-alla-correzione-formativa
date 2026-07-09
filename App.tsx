
import React, { useState, useCallback } from 'react';
import { InputPanel } from './components/InputPanel';
import { FeedbackPanel } from './components/FeedbackPanel';
import { generateFeedback } from './services/geminiService';
import type { FeedbackData } from './types';

const App: React.FC = () => {
  const [studentText, setStudentText] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!studentText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await generateFeedback(studentText);
      setFeedback(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Si è verificato un errore sconosciuto.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [studentText, isLoading]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Assistente alla Correzione Formativa
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Incolla il testo di uno studente per ricevere un'analisi AI strutturata, focalizzata sulla crescita e il miglioramento.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputPanel
            studentText={studentText}
            setStudentText={setStudentText}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <FeedbackPanel
            isLoading={isLoading}
            error={error}
            feedback={feedback}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
