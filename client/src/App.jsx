import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetails from "./pages/Products/ProductDetails";

import DashboardLayout from "./Layouts/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Products from "./pages/Products/Products";
import Employees from "./pages/Employees/Employees";
import Installations from "./pages/Installations/Installations";
import Support from "./pages/Support/Support";
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
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/installations/:id" element={<InstallationDetails />} />
        <Route path="/support" element={<Support />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default App;