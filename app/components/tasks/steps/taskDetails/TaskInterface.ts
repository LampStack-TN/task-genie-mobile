interface Task {
    id?: number;
    client?: string;
    urgency?: string;
    title?: string;
    updatedAt?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    description?: string;
  }
  
  export default Task;