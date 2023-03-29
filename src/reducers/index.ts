import { combineReducers } from "redux";
import { pinReducer } from "./pinReducers";
import { addTables } from "./addTable";
import { getTable } from "./getTable";
import { getOrders } from "./orders";

const rootReducer = combineReducers({
  pin: pinReducer,
  tables: addTables,
  getTable: getTable,
  orders: getOrders,
});

export default rootReducer;
