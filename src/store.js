//import

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/toDoSlice";
import loginReducer from "./slice/loginSlice";

//create store
export let store = configureStore({
  reducer: {
    // todo: todoReducer,
    login: loginReducer,
  },
});
