import Cookies from "js-cookie";
import { tableInterface } from "@/types/table";

interface Action {
  type: string;
  payload: any;
}

export function addTables(
  state: tableInterface[] = Cookies.get("tables") ? JSON.parse(Cookies.get("tables") as any) : [],
  action: Action
) {
  switch (action.type) {
    case "ADD_TABLES":
      return action.payload;

    default:
      return state;
  }
}
