import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import SupplierContext from "../context/SupplierContext";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
    const { supplier } = useContext(SupplierContext);
  return (
    <Router>
      {supplier && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
