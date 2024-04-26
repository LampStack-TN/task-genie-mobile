export type Task = {
    id: string;
    title: string;
    description: string;
    location: string;
    urgency: string;
    createdAt: string;  // Assuming the date is stored as a string
    price:string
    task:{}
    status?: 'Pending' | 'Accepted' | 'Rejected';  // Options
  };