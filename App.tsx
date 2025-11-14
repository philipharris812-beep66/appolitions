
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { FishIdCard } from './components/FishIdCard';
import { Loader } from './components/Loader';
import { identifyFish } from './services/geminiService';
import type { FishData } from './types';
import { FishIcon } from './components/icons/FishIcon';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fishData, setFishData] = useState<FishData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setFishData(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // remove the data URI prefix
        resolve(result.split(',')[1]);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleIdentify = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFishData(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await identifyFish(base64Image, imageFile.type);
      
      if (result && result.isFish) {
        setFishData(result);
      } else {
        setError("Could not identify a fish in the image. Please try another one.");
        setFishData(null);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during identification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const resetState = () => {
    setImageFile(null);
    setImageUrl(null);
    setFishData(null);
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white font-sans">
      <Header onReset={resetState} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="bg-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 flex flex-col gap-6 sticky top-8">
            <h2 className="text-2xl font-bold text-cyan-300">Upload Fish Photo</h2>
            <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
            <button
              onClick={handleIdentify}
              disabled={!imageFile || isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Identifying...
                </>
              ) : (
                'Identify Fish'
              )}
            </button>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 min-h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">
                <Loader size="lg"/>
                <p className="mt-4 text-cyan-300 animate-pulse">Analyzing image...</p>
              </div>
            ) : error ? (
               <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">
                 <h3 className="font-bold text-lg">Error</h3>
                 <p>{error}</p>
              </div>
            ) : fishData ? (
              <FishIdCard data={fishData} imageUrl={imageUrl!} />
            ) : (
              <div className="text-center text-slate-400">
                <FishIcon className="w-24 h-24 mx-auto text-cyan-600/50" />
                <h3 className="mt-4 text-xl font-semibold text-slate-300">Awaiting Analysis</h3>
                <p>Upload a fish photo to begin your discovery.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
