import { combineReducers } from "redux";
import authReducer from "./auth";

const RootReducer = combineReducers({
  auth: authReducer,
});

export default RootReducer;
