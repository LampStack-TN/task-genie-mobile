export type Tasks = {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: string;
  dueDate: string;
  price: string;
  minPrice: number;
  maxPrice: number;
  _count?: string;

  handleDelete?: (taskId: number) => void;
};
