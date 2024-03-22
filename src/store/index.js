import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import { productReducer } from "./product-slice";

import { orderReducer } from "./Order-slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;
