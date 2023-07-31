import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slice/UserSlice";

export const rootReducer = combineReducers({
  users: userSlice.reducer,
});

export default rootReducer;
