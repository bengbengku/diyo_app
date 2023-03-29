import Cookies from "js-cookie";

export function pinReducer(
  state = Cookies.get("pin") ? JSON.parse(Cookies.get("pin") as any) : null,
  action: any
) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;

    default:
      return state;
  }
}
