interface Task {
  id?: number;
  client?: any;
  urgency?: string;
  title?: string;
  skills?: any[];
  updatedAt?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  description?: string;
  _count?: any;
  dueDate?: string;
  applied: boolean;
  liked: boolean;
}

export default Task;
