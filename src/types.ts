export type Task = {
  id: number;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
};
