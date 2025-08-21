import auth from "../hooks/store";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth,
});
export default rootReducer;
