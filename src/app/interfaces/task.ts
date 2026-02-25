export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  category: 'Work' | 'Personal' | 'School' | 'Health' | 'Shopping' | 'Other';
  createdAt: Date;
  deadline?: string;
}