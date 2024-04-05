import {  Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers/customers";
import Dashboard from "../../Pages/Dashbaord/dashboard";
import Inventory from "../../Pages/Inventory/inventory";
import Users from "../../Pages/Users/user";
import Orders from "../../Pages/Orders/loan";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/users" element={<Users />}></Route>
    </Routes>
  );
}
export default AppRoutes;
