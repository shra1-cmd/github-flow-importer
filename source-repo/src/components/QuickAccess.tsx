import React from 'react';
import { Camera, History, BarChart3, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const QuickAccess = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <p className="text-lg text-gray-600">Get started with your health tracking journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {user ? (
            <Link to="/upload" className="block">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Camera size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                <p className="text-gray-600 text-sm">
                  Snap a photo of your meal and get instant nutrition analysis
                </p>
              </div>
            </Link>
          ) : (
            <Link to="/auth" className="block">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Camera size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                <p className="text-gray-600 text-sm">
                  Sign in to upload and analyze your meals
                </p>
              </div>
            </Link>
          )}

          <Link to={user ? "/history" : "/auth"} className="block">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <History size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View History</h3>
              <p className="text-gray-600 text-sm">
                {user ? "Track your nutrition journey and see your progress over time" : "Sign in to view your nutrition history"}
              </p>
            </div>
          </Link>

          <Link to={user ? "/results" : "/auth"} className="block">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">
                {user ? "Get detailed insights about your nutritional patterns and trends" : "Sign in to view your nutrition analytics"}
              </p>
            </div>
          </Link>

          <Link to={user ? "/profile" : "/auth"} className="block">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <User size={24} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-gray-600 text-sm">
                {user ? "Customize your goals and preferences for personalized recommendations" : "Sign in to manage your profile and settings"}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;