import { tableInterface } from "@/types/table";

interface Action {
  type: string;
  payload: any;
}

export function getTable(state: tableInterface | null = null, action: Action) {
  switch (action.type) {
    case "GET_TABLE":
      return action.payload;

    case "REMOVE_TABLE":
      return null;

    default:
      return state;
  }
}
