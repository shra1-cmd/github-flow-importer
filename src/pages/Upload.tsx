import React, { useState, useRef } from 'react';
import { Camera, Upload as UploadIcon, CheckCircle, DollarSign, Percent } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ApiService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PredictImageResult {
  [key: string]: any; // Allow any response format from the backend
}

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictImageResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setSelectedImageUrl(URL.createObjectURL(file));
    setResult(null); // Clear previous results
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    try {
      // Call only the predict-image endpoint
      const response = await ApiService.predictStream(selectedFile);
      
      setResult(response);

      toast({
        title: "✅ Upload successful!",
        description: "Image analyzed successfully",
      });

    } catch (error: any) {
      toast({
        title: "❌ Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setSelectedImageUrl(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Camera size={32} className="text-gray-700 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Your Meal</h1>
          </div>
          <p className="text-lg text-gray-600">
            We'll analyze your food and show nutritional breakdown instantly.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera size={32} className="text-blue-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drop your image here or click to browse
            </h3>
            <p className="text-gray-500 mb-6">
              Supports JPEG, PNG up to 5MB
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <UploadIcon size={20} className="inline mr-2" />
              Choose File
            </button>
          </div>
        </div>

        {selectedFile && !result && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Image Preview */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Selected Image</h3>
                {selectedImageUrl && (
                  <img 
                    src={selectedImageUrl} 
                    alt="Selected image" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                )}
                <p className="text-gray-500 mt-4">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>

              {/* Upload Button */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Ready to Analyze</h3>
                  <button
                    onClick={uploadImage}
                    disabled={uploading}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <UploadIcon size={20} className="inline mr-2" />
                        Upload & Analyze
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
              <p className="text-gray-600">Here are your analysis results:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Image */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UploadIcon size={24} className="text-blue-500 mr-2" />
                  Input Image
                </h3>
                {selectedImageUrl && (
                  <img 
                    src={selectedImageUrl} 
                    alt="Input image" 
                    className="w-full rounded-2xl shadow-lg"
                  />
                )}
              </div>

              {/* Response Data */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle size={24} className="text-green-500 mr-2" />
                  Analysis Result
                </h3>
                
                {/* Check if response contains an image URL/base64 */}
                {result.image && (
                  <div className="mb-6">
                    <img 
                      src={result.image} 
                      alt="Analysis result" 
                      className="w-full rounded-2xl shadow-lg mb-4"
                    />
                  </div>
                )}

                {/* Display JSON response */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Response Data:</h4>
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-h-96">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <button
                onClick={resetUpload}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <UploadIcon size={20} className="inline mr-2" />
                Analyze Another Image
              </button>
            </div>
          </div>
        )}

        {!selectedFile && !result && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-500">
                Upload an image to get started with AI-powered nutrition analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;