export type Language = 'en' | 'bn';

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  icon: string; // Dynamic identifier for Lucide icons
}

export interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  topic: string;
  category: string;
  tool: string;
  prompt: string;
  timestamp: number;
  language: Language;
  tone: string;
}

export interface AIHubLink {
  name: string;
  url: string;
  icon?: string;
}

export interface PromptToolItem {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  defaultTopicEn: string;
  defaultTopicBn: string;
}
