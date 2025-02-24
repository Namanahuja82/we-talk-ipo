import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import LoadingSkeleton from './LoadingSkeleton';

const IpoCard = ({ ipo }) => (
  <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
    <h3 className="text-lg font-medium mb-2">{ipo.company_name || ipo.name || 'Unknown Company'}</h3>
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-medium">Issue Size:</span> {ipo.issue_size || ipo.issueSize || 'N/A'}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Price Range:</span> {ipo.price_range || ipo.priceRange || 'N/A'}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Date:</span> {ipo.open_date || ipo.startDate || 'N/A'}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Type:</span> {ipo.type || 'MainBoard'}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('upcoming');
  const [selectedType, setSelectedType] = useState('mainboard');
  const [ipoData, setIpoData] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // IPO categories
  const ipoCategories = [
    { value: 'upcoming', label: 'Upcoming IPOs' },
    { value: 'closed', label: 'Closed IPOs' },
    { value: 'announced', label: 'Announced IPOs' }
  ];

  // IPO types
  const ipoTypes = [
    { value: 'mainboard', label: 'MainBoard' },
    { value: 'sme', label: 'SME' },
    { value: 'all', label: 'All' }
  ];

  // Determine the API endpoint based on selected category and type
  const getEndpoint = () => {
    if (selectedCategory === 'upcoming') {
      if (selectedType === 'mainboard') return 'upcoming';
      if (selectedType === 'sme') return 'upcomingSME';
      if (selectedType === 'all') return 'upcomingAll';
    } else if (selectedCategory === 'closed') {
      if (selectedType === 'mainboard') return 'closed';
      if (selectedType === 'sme') return 'closedSME';
      if (selectedType === 'all') return 'closedAll';
    } else if (selectedCategory === 'announced') {
      return 'announced';
    }
    return 'upcoming'; // Default fallback
  };

  useEffect(() => {
    const fetchIpoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = getEndpoint();
        console.log(`Fetching data from endpoint: ${endpoint}`);
        
        const response = await fetch(`http://localhost:3000/get/${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different response structures
        if (data && data.ipos) {
          setIpoData(data.ipos);
        } else if (Array.isArray(data)) {
          setIpoData(data);
        } else {
          console.error("Unexpected data structure:", data);
          setIpoData([]);
        }
      } catch (err) {
        console.error('Error fetching IPO data:', err);
        setError(`Failed to fetch IPO data: ${err.message}`);
        setIpoData([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchIpoData();
    }
  }, [selectedCategory, selectedType, token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                IPO Dashboard
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* IPO Category Selector */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ipoCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                
                {/* IPO Type Selector */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ipoTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ipoData && ipoData.length > 0 ? (
                  ipoData.map((ipo, index) => (
                    <IpoCard key={index} ipo={ipo} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No IPO data available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;