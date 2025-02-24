import React from 'react';
import Header from './Header';

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Blogs</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Blog content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;