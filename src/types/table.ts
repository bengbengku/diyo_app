export enum Status {
  AVAILABLE = "Available",
  SEATED = "Seated",
  ORDERED = "Ordered",
  BILLING = "Billing",
}

export interface tableInterface {
  name?: string;
  status?: Status;
}
