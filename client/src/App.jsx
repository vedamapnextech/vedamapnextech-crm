import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetails from "./pages/Products/ProductDetails";
import LeadDetails from "./pages/Customers/LeadDetails";
import CustomersList from "./pages/Customers/CustomersList";

import DashboardLayout from "./Layouts/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import CustomerDetails from "./pages/CustomerDetails";

import Products from "./pages/Products/Products";
import Employees from "./pages/Employees/Employees";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import Installations from "./pages/Installations/Installations";
import Support from "./pages/Support/Support";
import SupportDetails from "./pages/Support/SupportDetails";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";
import InstallationDetails from "./pages/Installations/InstallationDetails";

function App() {
  return (
    <Routes>

      {/* Redirect "/" -> "/dashboard" */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/installations/:id" element={<InstallationDetails />} />
        <Route path="/customers-list" element={<CustomersList />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/:id" element={<SupportDetails />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default App;