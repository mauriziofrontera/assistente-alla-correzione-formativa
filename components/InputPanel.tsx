
import React from 'react';

interface InputPanelProps {
  studentText: string;
  setStudentText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ studentText, setStudentText, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Testo dello Studente</h2>
      <div className="flex-grow flex flex-col">
          <textarea
            rows={20}
            className="w-full h-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out text-base"
            placeholder="Incolla qui il tema, il saggio breve o la risposta dello studente per avviare l'analisi...."
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            disabled={isLoading}
          />
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading || !studentText.trim()}
        className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        {isLoading ? 'Analisi in corso...' : 'Genera Feedback Formativo'}
      </button>
    </div>
  );
};
