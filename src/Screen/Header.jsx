import React, { useState, useEffect, useRef } from "react";
import { Leaf, Menu, X, LogOut, ShoppingCart, ClipboardList, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authState, setAuthState] = useState({ isLoggedIn: false, isRegistered: false, farmerName: "" });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const updateAuthState = () => {
    const token = localStorage.getItem('farmerToken');
    const registered = localStorage.getItem('isFarmerRegistered');
    const data = localStorage.getItem('farmerData');
    let farmerName = "";
    try { farmerName = data ? JSON.parse(data)?.farmerName || "" : ""; } catch { }
    setAuthState({ isLoggedIn: !!token, isRegistered: !!registered, farmerName });
  };

  useEffect(() => {
    updateAuthState();
    window.addEventListener('storage', updateAuthState);
    return () => window.removeEventListener('storage', updateAuthState);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmerToken');
    localStorage.removeItem('farmerData');
    updateAuthState();
    setDropdownOpen(false);
    navigate('/');
    setMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "F";
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderAuthSection = () => {
    if (authState.isLoggedIn) {
      return (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-3 py-1.5 rounded-full transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-green-700 font-bold text-xs">
              {getInitials(authState.farmerName)}
            </div>
            <span className="text-sm font-medium max-w-[80px] truncate hidden sm:block">
              {authState.farmerName || "Farmer"}
            </span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
              {/* User Info */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-700 font-bold">
                    {getInitials(authState.farmerName)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white font-semibold text-sm truncate">{authState.farmerName || "Farmer"}</p>
                    <p className="text-green-100 text-xs">Registered Farmer</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  to="/cart"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
                    <ShoppingCart size={15} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">My Cart</p>
                    <p className="text-xs text-gray-400">View cart items</p>
                  </div>
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                    <ClipboardList size={15} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">My Orders</p>
                    <p className="text-xs text-gray-400">Track your orders</p>
                  </div>
                </Link>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                      <LogOut size={15} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Logout</p>
                      <p className="text-xs text-gray-400">Sign out of account</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (authState.isRegistered) {
      return (
        <Link
          to="/farmer/login"
          className="bg-white text-green-700 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition shadow-md"
        >
          Login
        </Link>
      );
    } else {
      return (
        <Link
          to="/farmer/signup"
          className="bg-white text-green-700 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition shadow-md"
        >
          Register
        </Link>
      );
    }
  };

  const renderMobileAuthSection = () => {
    if (authState.isLoggedIn) {
      return (
        <>
          <li>
            <div className="flex items-center gap-3 py-2 border-t border-green-500">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-green-700 font-bold text-sm">
                {getInitials(authState.farmerName)}
              </div>
              <span className="font-semibold">{authState.farmerName || "Farmer"}</span>
            </div>
          </li>
          <li>
            <Link to="/cart" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-green-200 transition">
              <ShoppingCart size={16} /> My Cart
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-green-200 transition">
              <ClipboardList size={16} /> My Orders
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white rounded-xl py-2 font-bold hover:bg-red-600 transition">
              <LogOut size={16} /> Logout
            </button>
          </li>
        </>
      );
    } else if (authState.isRegistered) {
      return (
        <li className="pt-4 border-t border-green-500">
          <Link to="/farmer/login" onClick={() => setMenuOpen(false)}
            className="block text-center bg-white text-green-600 rounded-xl py-2 font-bold hover:bg-green-50 transition">
            Login
          </Link>
        </li>
      );
    } else {
      return (
        <li className="pt-4 border-t border-green-500">
          <Link to="/farmer/signup" onClick={() => setMenuOpen(false)}
            className="block text-center bg-white text-green-600 rounded-xl py-2 font-bold hover:bg-green-50 transition">
            Register
          </Link>
        </li>
      );
    }
  };

  return (
    <header className="fixed top-0 w-full bg-green-600 shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="text-green-300" size={24} />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Demonstration</h3>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Our Team", path: "/ourTeam" },
                { label: "Products", path: "/products" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white hover:text-green-200 font-medium transition text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {renderAuthSection()}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-green-200 transition"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-green-700 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"}`}>
        <ul className="flex flex-col gap-4 px-6 text-white text-base">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Our Team", path: "/ourTeam" },
            { label: "Products", path: "/products" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setMenuOpen(false)} className="block hover:text-green-200 transition">
                {item.label}
              </Link>
            </li>
          ))}
          {renderMobileAuthSection()}
        </ul>
      </div>
    </header>
  );
}
