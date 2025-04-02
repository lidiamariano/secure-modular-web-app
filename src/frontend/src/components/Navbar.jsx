import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Secure Web App
        </h1>
        <div className="space-x-4">
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600">
                Produtos
              </Link>
              <Link to="/users" className="text-gray-700 hover:text-blue-600">
                Usuários
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
