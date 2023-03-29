import { ProductsInterface } from "@/types/products";

interface Action {
  type: string;
  payload: any;
}

export function getOrders(state: ProductsInterface[] | [] = [], action: Action) {
  switch (action.type) {
    case "GET_ORDERS":
      return action.payload;

    case "REMOVE_ORDERS":
      return null;

    default:
      return state;
  }
}
