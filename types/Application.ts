interface Application {
  id: number;
  taskId: number;
  applicantId: number;
  price: number | null;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
  updatedAt: string;
  applicant: {
    id: number;
    fullName: string;
    email: string;
    city: string;
    phone: number;
  };
}
