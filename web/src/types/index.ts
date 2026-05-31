export interface User {
  _id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  bio?: string;
  settings?: {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
  };
}

export interface Chat {
  _id: string;
  title: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
}
