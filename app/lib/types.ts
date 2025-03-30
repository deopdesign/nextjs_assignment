export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  image_url: string; // Remove optional (?) since we now guarantee a value
  amount: number;
  status: string;
  date: string;
};
