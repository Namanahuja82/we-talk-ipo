import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-gray-200 rounded col-span-1"></div>
              <div className="h-3 bg-gray-200 rounded col-span-2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-gray-200 rounded col-span-1"></div>
              <div className="h-3 bg-gray-200 rounded col-span-2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-gray-200 rounded col-span-1"></div>
              <div className="h-3 bg-gray-200 rounded col-span-2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-gray-200 rounded col-span-1"></div>
              <div className="h-3 bg-gray-200 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;