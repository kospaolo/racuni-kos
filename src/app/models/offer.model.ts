export interface Offer {
  id?: any;
  customerId: any;
  services: { serviceId: string; quantity: number }[];
  created: Date;
  number: string;
}