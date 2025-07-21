
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Navigation Arrows */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
        <ChevronLeft size={20} className="text-gray-600" />
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
        <ChevronRight size={20} className="text-gray-600" />
      </button>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] text-center px-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-8">
          <Zap size={32} className="text-blue-500" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl">
          AI-Powered Food Analysis
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Upload food images and get instant nutritional analysis with detailed predictions
        </p>
        
        <Link 
          to="/upload"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Upload Image
        </Link>
      </div>
      
      {/* Bottom Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
