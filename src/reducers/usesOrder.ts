import Cookies from "js-cookie";
import { usersOrderInterface } from "@/types/usersOrder";

interface Action {
  type: string;
  payload: any;
}

export function usersOrder(state: usersOrderInterface[] | [] = [], action: Action) {
  switch (action.type) {
    case "ADD_USERS_ORDER":
      return action.payload;

    default:
      return state;
  }
}
