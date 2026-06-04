/**
 * Types defining Portfolio data structures & state
 */

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'focus_ai' | 'hobbies';
  level: number; // percentage index (e.g. 90)
  iconName: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  techStack: string[];
  features: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
