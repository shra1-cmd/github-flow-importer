import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Upload, History, User, Bell, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  const navLinkClass = (path: string): string => {
    const baseClass = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200";
    return isActive(path)
      ? `${baseClass} bg-blue-100 text-blue-700`
      : `${baseClass} text-gray-600 hover:bg-gray-100 hover:text-gray-900`;
  };

  const handleSignOut = async () => {
    await signOut();
    setShowProfileMenu(false);
    navigate('/auth');
  };

  if (!user) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">FT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FitTrack AI</span>
            </Link>
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">FT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FitTrack AI</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClass('/')}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/upload" className={navLinkClass('/upload')}>
              <Upload size={18} />
              <span>Upload</span>
            </Link>
            <Link to="/results" className={navLinkClass('/results')}>
              <span>Results</span>
            </Link>
            <Link to="/history" className={navLinkClass('/history')}>
              <History size={18} />
              <span>History</span>
            </Link>
            <Link to="/profile" className={navLinkClass('/profile')}>
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;