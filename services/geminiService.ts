
import { GoogleGenAI, Type } from "@google/genai";
import type { FeedbackData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const promptTemplate = (studentText: string): string => `
Agisci come un esperto e incoraggiante professore di liceo. Il tuo compito è fornire un feedback formativo e costruttivo per il seguente testo scritto da uno studente. NON DEVI ASSEGNARE UN VOTO NUMERICO. L'analisi deve essere oggettiva, bilanciata e finalizzata ad aiutare lo studente a migliorare.

TESTO DELLO STUDENTE:
"""
${studentText}
"""

Fornisci la tua analisi esclusivamente come un oggetto JSON, senza testo aggiuntivo prima o dopo. L'oggetto JSON deve avere la seguente struttura:
{
  "punti_di_forza": ["Elenca qui 2-3 punti di forza specifici del testo."],
  "miglioramento_contenuto": ["Elenca qui 2-3 suggerimenti specifici per migliorare il contenuto e la profondità dell'argomentazione."],
  "miglioramento_struttura": ["Elenca qui 2-3 suggerimenti specifici per migliorare l'organizzazione, la coesione e la fluidità del testo."],
  "suggerimenti_linguistici": ["Identifica 1-2 esempi di possibili miglioramenti stilistici o grammaticali, presentandoli come suggerimenti gentili."]
}
`;

const feedbackSchema = {
  type: Type.OBJECT,
  properties: {
    punti_di_forza: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 punti di forza specifici del testo."
    },
    miglioramento_contenuto: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 suggerimenti specifici per migliorare il contenuto e l'argomentazione."
    },
    miglioramento_struttura: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 suggerimenti specifici per migliorare l'organizzazione e la coesione."
    },
    suggerimenti_linguistici: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "1-2 esempi di miglioramenti stilistici o grammaticali."
    }
  },
  required: ["punti_di_forza", "miglioramento_contenuto", "miglioramento_struttura", "suggerimenti_linguistici"]
};

export const generateFeedback = async (studentText: string): Promise<FeedbackData> => {
  if (!studentText.trim()) {
    throw new Error("Il testo dello studente non può essere vuoto.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptTemplate(studentText),
      config: {
        responseMimeType: "application/json",
        responseSchema: feedbackSchema,
        temperature: 0.7,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData: FeedbackData = JSON.parse(jsonText);
    return parsedData;

  } catch (error) {
    console.error("Errore durante la generazione del feedback:", error);
    throw new Error("Impossibile generare il feedback. Il modello potrebbe essere sovraccarico o si è verificato un errore di rete. Riprova più tardi.");
  }
};
