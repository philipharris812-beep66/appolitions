
import React from 'react';

export const FishIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 22a2.5 2.5 0 0 0 0-5l-1-2-4 2-4-2-1 2a2.5 2.5 0 0 0 0 5" />
    <path d="M18 15l-2-3-2 3" />
    <path d="m6 15-2-3-2 3" />
    <path d="M12 12V2" />
    <path d="M18 12s-2-3-6-3-6 3-6 3" />
  </svg>
);
