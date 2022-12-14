export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date
}

export type NewData = {
  title?: string;
  completed?: boolean;
}