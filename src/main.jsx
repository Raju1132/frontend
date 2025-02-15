import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoice from "./pages/Invoice.jsx";
import Csv from "./pages/Csv";
import Nav from "./components/Nav.jsx";
import CreateCustomer from "./pages/CreateCustomer.jsx";
import Filter from "./pages/Filter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createcustomer" element={<CreateCustomer />} />
        <Route path="/Invoice" element={<Invoice />} />
        <Route path="/csv" element={<Csv />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
