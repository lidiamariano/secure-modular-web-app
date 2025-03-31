import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import ProductForm from "./pages/ProductForm";
import UserForm from "./pages/UserForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/products"
          element={<ProtectedRoute><Products /></ProtectedRoute>}
        />
        <Route
          path="/products/new"
          element={<ProtectedRoute><ProductForm /></ProtectedRoute>}
        />
        <Route
          path="/products/edit/:id"
          element={<ProtectedRoute><ProductForm /></ProtectedRoute>}
        />
        <Route
          path="/users"
          element={<ProtectedRoute><Users /></ProtectedRoute>}
        />
        <Route
          path="/users/edit/:id"
          element={<ProtectedRoute><UserForm /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
