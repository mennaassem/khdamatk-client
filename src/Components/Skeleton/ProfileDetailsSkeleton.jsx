import React from 'react';

export default function ProfileDetailsSkeleton() {
  return (
    <div className="pt-14 animate-pulse">
      <div className="h-6 w-40 bg-gray-300 rounded mb-3" />

      <div className="h-4 w-32 bg-gray-300 rounded mb-4" />

      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="h-4 w-20 bg-gray-300 rounded" />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="h-4 w-4 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>

      <div className="h-3 w-32 bg-gray-300 rounded mt-2" />

      <div className="space-y-2 mt-4">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
      </div>
    </div>
  );
}