export type TaskCategory = "Work" | "Personal" | "Urgent";

export type Task = {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: number;
};