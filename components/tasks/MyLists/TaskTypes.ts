export type Tasks = {
    id: string;
    title: string;
    description: string;
    location: string;
    urgency: string;
    dueDate: string;  
    price:string
    minPrice: number;
  maxPrice: number;
  handleDelete?: (taskId: number) => void;

  };