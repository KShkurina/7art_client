import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import { siteAPI } from "../API/siteAPI.js";
import { productAPI } from "../API/productAPI";
import { cartAPI } from "../API/cartAPI";

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(siteAPI.middleware)
      .concat(productAPI.middleware)
      .concat(cartAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
