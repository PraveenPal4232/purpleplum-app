import React from "react";
import "./App.css";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import DetailsPage from "./components/DetailsPage";
import ProductsPage from "./components/ProductsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="sensibull-app">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<DetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
