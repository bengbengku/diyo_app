import { tableInterface, Status } from "@/types/table";

export const tableSeed: tableInterface[] = [
  {
    name: "Table 1",
    status: Status.AVAILABLE,
  },
  {
    name: "Table 2",
    status: Status.SEATED,
  },
  {
    name: "Table 3",
    status: Status.SEATED,
  },
  {
    name: "Table 4",
    status: Status.SEATED,
  },
  {
    name: "Table 5",
    status: Status.BILLING,
  },
  {
    name: "Table 6",
    status: Status.ORDERED,
  },
];
