import {  Route, Routes } from "react-router-dom";
import Customers from "../Pages/Customers/index";
import Dashboard from "../Pages/Dashbaord/index";
import Inventory from "../Pages/Inventory/index";
import Orders from "../Pages/Orders/index";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
