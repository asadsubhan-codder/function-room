export type QuizQuestion = {
  id: string;
  kind?: "choice" | "input" | "explain";
  prompt: string;
  choices?: string[];
  answer?: number;
  accepted?: string[];
  requiredGroups?: string[][];
  minLength?: number;
  placeholder?: string;
  explanation: string;
  skill: string;
  category?: "K/U" | "Thinking" | "Communication" | "Application";
};
