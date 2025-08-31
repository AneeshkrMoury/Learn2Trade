export enum Tab {
  Home = 'Home',
  Learn = 'Learn',
  Trade = 'Trade',
  Profile = 'Profile',
}

export type Language = 'en' | 'hi';

export const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' }, // Hindi
];

export interface TableData {
    headerKeys: string[];
    rows: (string | number)[][]; // string is a translation key
}

export type ContentBlock =
  | { type: 'header'; textKey: string; }
  | { type: 'explanation'; textKeys: string[]; }
  | { type: 'analogy'; textKeys: string[]; }
  | { type: 'takeaways'; itemKeys: string[]; }
  | { type: 'barChart'; data: { nameKey: string; value: number; labelKey: string; }[]; colors: string[]; }
  | { type: 'pieChart'; data: { nameKey: string; value: number; }[]; colors: string[]; }
  | { type: 'diagram'; data: { titleKey: string; lanes: { titleKey: string; steps: { from: string; to: string; itemKey: string; }[] }[] } }
  | { type: 'table'; data: TableData; };

export interface TutorialModule {
  id: string;
  titleKey: string;
  descriptionKey: string;
  content: ContentBlock[];
}

export interface QuizQuestion {
  questionKey: string;
  optionKeys: string[];
  correctAnswerKey: string;
}

export interface Quiz {
  id:string;
  titleKey: string;
  questions: QuizQuestion[];
}

export interface Order {
    price: number;
    quantity: number;
}

export interface MarketDepth {
    bids: Order[];
    asks: Order[];
}

export interface Stock {
  ticker: string;
  name: string;
  price: number; // Last Traded Price (LTP)
  history: { date: string; price: number }[];
  open: number;
  high: number;
  low: number;
  close: number; // Previous Day's Close
  volume: number;
  marketDepth: MarketDepth;
}

export interface HeldStock {
  ticker: string;
  quantity: number;
  avgPrice: number;
}

export interface Portfolio {
  cash: number;
  holdings: HeldStock[];
}

export interface UserProgress {
  completedTutorials: string[];
  quizScores: { [quizId: string]: number };
}

export interface User {
  name: string;
  email: string; // Unique ID for the user
  password: string; // NOTE: In a real-world app, this would be a securely hashed password.
  dob?: string;
  mobile?: string;
  gender?: string;
  workingStatus?: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: number; // Timestamp
}