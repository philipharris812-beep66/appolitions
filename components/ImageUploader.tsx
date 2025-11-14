
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div
        onClick={handleClick}
        className="cursor-pointer border-2 border-dashed border-slate-500 rounded-lg p-4 text-center hover:border-cyan-400 hover:bg-slate-800/50 transition-colors duration-300 aspect-video flex flex-col items-center justify-center"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Fish preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-slate-400">
            <UploadIcon className="w-12 h-12 mx-auto" />
            <p className="mt-2 font-semibold">Click to upload image</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
