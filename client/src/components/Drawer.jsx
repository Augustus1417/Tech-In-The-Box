import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  X, Smartphone, Laptop, Headphones,
  ShoppingCart, Package, User, LogIn, LogOut, ShieldUser
} from "lucide-react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { UserContext } from "../UserContext";

const DrawerComponent = ({ isOpen, toggleDrawer }) => {
  const { isAuthenticated, userRole, logout } = useContext(UserContext);

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      size={260}
      style={{ zIndex: 1000 }}
    >
      <div className="h-full bg-white shadow-lg flex flex-col justify-between">

        {/* Header */}
        <div>
          <div className="bg-black text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Menu</h2>
            <button onClick={toggleDrawer} className="hover:text-gray-300">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 p-6">
            <Link to="/phones" onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <Smartphone size={20} /> Phones
            </Link>
            <Link to="/laptops" onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <Laptop size={20} /> Laptops
            </Link>
            <Link to="/accessories" onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <Headphones size={20} /> Accessories
            </Link>
            <Link to={isAuthenticated ? "/cart" : "/login"} onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <ShoppingCart size={20} /> Cart
            </Link>
            <Link to={isAuthenticated ? "/orders" : "/login"} onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <Package size={20} /> Orders
            </Link>
            <Link to={isAuthenticated ? "/account" : "/login"} onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
              <User size={20} /> Account
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
                <LogIn size={20} /> Login
              </Link>
            )}
            {userRole === 'admin' && (
                <Link to="/admin" onClick={toggleDrawer} className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-600 transition">
                <ShieldUser size={20} /> Admin
                </Link>
            )}
          </nav>
        </div>

        {/* Footer (Logout Button) */}
        {isAuthenticated && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={() => {
                logout();
                toggleDrawer();
              }}
              className="flex items-center gap-2 text-lg text-red-600 hover:text-red-700 transition"
            >
              <LogOut size={20} /> Sign out
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
