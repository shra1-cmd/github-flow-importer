import React, { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Apple, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchUserHistory();
  }, [user, navigate]);

  const fetchUserHistory = async () => {
    try {
      const data = await ApiService.getHistory();
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your History</h1>
          <p className="text-lg text-gray-600">
            Track your nutrition journey over time
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your history...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="space-y-4">
            {images.map((image) => (
              <div key={image.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
                <img src={image.image_url} alt={image.original_filename} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold">{image.original_filename}</h3>
                  <p className="text-sm text-gray-600">{new Date(image.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-blue-600 font-medium">{image.analysis_status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No History Yet</h3>
            <p className="text-gray-600">Start uploading meals to build your nutrition history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;