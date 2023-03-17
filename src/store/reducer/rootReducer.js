import { combineReducers } from "@reduxjs/toolkit";
import { headerSlice } from "../../components/Header/headerSlice";
import { siteAPI } from "../../API/siteAPI";
import { cartAPI } from "../../API/cartAPI";
import { productAPI } from "../../API/productAPI";
import { filterSlice } from "../../components/Filter/filterSlice";
import { cartSlice } from "../../pages/CartPage/cartSlice";
import { singleCarousel } from "../../components/SingleCarousel/singleCarouselSlice";
import { sendMaiAPI } from "../../API/sendMailAPI";
// import { cardSlice } from "../../components/Card/cardSlice";

const rootReducer = combineReducers({
  header: headerSlice.reducer,
  filter: filterSlice.reducer,
  cart: cartSlice.reducer,
  singleCarousel: singleCarousel.reducer,
  // card: cardSlice.reducer,
  [siteAPI.reducerPath]: siteAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [cartAPI.reducerPath]: cartAPI.reducer,
  [sendMaiAPI.reducerPath]: sendMaiAPI.reducer,
});

export default rootReducer;
