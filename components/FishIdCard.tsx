
import React from 'react';
import type { FishData } from '../types';

interface FishIdCardProps {
  data: FishData;
  imageUrl: string;
}

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="py-3 border-b border-cyan-800/50">
    <h3 className="font-semibold text-cyan-300">{label}</h3>
    <p className="text-slate-300 mt-1">{children}</p>
  </div>
);

export const FishIdCard: React.FC<FishIdCardProps> = ({ data, imageUrl }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
        <img src={imageUrl} alt={data.commonName} className="w-full h-auto object-cover" />
      </div>
      <h2 className="text-3xl font-bold text-cyan-300">{data.commonName}</h2>
      <p className="text-lg italic text-slate-400 mb-4">{data.scientificName}</p>
      
      <div className="flex flex-col gap-2">
        <InfoRow label="Description">{data.description}</InfoRow>
        <InfoRow label="Habitat">{data.habitat}</InfoRow>
        <InfoRow label="Diet">{data.diet}</InfoRow>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config if possible, or use a style tag.
// For simplicity in this environment, we'll rely on a small style injection in the main app or assume tailwind config is extended.
// Here's a CSS keyframe example:
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
*/
// This animation is conceptually applied via the `animate-fade-in` class.
// A simple way to add it without separate CSS file is a style tag in index.html, but let's assume tailwind's `animate-pulse` is sufficient for UX.
// For the card, we will just have it appear. A better approach in a real project would be to configure tailwind.
