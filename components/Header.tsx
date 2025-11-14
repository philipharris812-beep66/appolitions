
import React from 'react';
import { FishIcon } from './icons/FishIcon';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-cyan-800/50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div onClick={onReset} className="flex items-center gap-3 cursor-pointer">
          <FishIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white tracking-wider">
            Aqua<span className="text-cyan-400">Scope</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
