import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "../feature/dashboard/dasboardSlice";
import userReducer from "../feature/user/userSlice";
import itemReducer from "../feature/items/itemsSlice";
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
    items: itemReducer,
  },
});
