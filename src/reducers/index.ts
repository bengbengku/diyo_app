import { combineReducers } from "redux";
import { pinReducer } from "./pinReducers";
import { addTables } from "./addTable";
import { getTable } from "./getTable";
import { getOrders } from "./orders";
import { usersOrder } from "./usesOrder";

const rootReducer = combineReducers({
  pin: pinReducer,
  tables: addTables,
  getTable: getTable,
  orders: getOrders,
  usersOrder: usersOrder,
});

export default rootReducer;
