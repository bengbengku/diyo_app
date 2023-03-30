import { ProductsInterface } from "@/types/products";

export enum Status {
  AVAILABLE = "Available",
  SEATED = "Seated",
  ORDERED = "Ordered",
  BILLING = "Billing",
}

export interface usersOrderInterface {
  name?: string;
  status?: Status;
  items: ProductsInterface[];
}
