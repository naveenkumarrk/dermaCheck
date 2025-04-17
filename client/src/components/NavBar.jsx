import React, { useState, useEffect } from 'react';
import { Home, CreditCard, Menu, X, LogOut, LogIn, UserPlus, User } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="sticky top-0 z-50">
      <nav className={`transition-all duration-300 px-6 ${isScrolled ? 'py-3 shadow-md bg-white' : 'py-5 bg-white/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <h1 className='font-serif text-2xl font-bold text-gray-800'>
                  <span className="text-emerald-600">Skin</span>Check
                </h1>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" icon={<Home size={18} />} text="Dashboard" />
                  <NavLink to="/profile" icon={<User size={18} />} text="Profile" />
                  <button
                    onClick={handleLogout}
                    className="ml-4 flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center px-5 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute inset-x-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    {user?.email}
                  </span>
                </div>
                <NavLinkMobile to="/dashboard" icon={<Home size={18} />} text="Dashboard" />
                <NavLinkMobile to="/profile" icon={<User size={18} />} text="Profile" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full px-3 py-3 text-center rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full px-3 py-3 text-center rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
    <span className="mr-2">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </Link>
);

const NavLinkMobile = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center px-3 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
    <span className="mr-3">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </Link>
);

export default Navbar;