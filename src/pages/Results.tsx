import React, { useEffect, useState } from 'react';
import { ChefHat, Clock, Users, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchUserImages();
  }, [user, navigate]);

  const fetchUserImages = async () => {
    try {
      const data = await ApiService.getResults();
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis Results</h1>
          <p className="text-lg text-gray-600">
            Your nutrition analysis results and insights
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your results...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid gap-6">
            {images.map((image) => (
              <div key={image.id} className="bg-white rounded-3xl shadow-lg p-8">
                <img src={image.image_url} alt={image.original_filename} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{image.original_filename}</h3>
                <p className="text-gray-600">Status: {image.analysis_status}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <ChefHat size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-gray-600">Upload some images to see your nutrition analysis results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;