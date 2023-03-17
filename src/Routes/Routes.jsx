import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import FavoritePage from "../pages/FavoritePage/FavoritePage.jsx";
import InfoAboutPage from "../pages/InfoAboutPage/InfoAboutPage.jsx";
import CartPage from "../pages/CartPage/CartPage.jsx";
import FilterPage from "../pages/FilterPage/FilterPage.jsx";
import CardPage from "../pages/CardPage/CardPage.jsx"
import DeliveryPage from "../pages/DeliveryPage/DeliveryPage.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
      <Route index element={<HomePage />} /></Route>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/about" element={<InfoAboutPage />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/filter/card/:id" element={<CardPage />} />    
      <Route path="/delivery" element={<DeliveryPage />} />    
      </Routes>
  );
}

export default AppRoutes;
