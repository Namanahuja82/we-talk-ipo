import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First check if the user already exists
      const checkResponse = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          password: Math.random().toString(36).slice(-8) // Temporary password
        }),
      });

      const data = await checkResponse.json();

      if (checkResponse.ok) {
        // If registration successful, redirect to password setup
        navigate('/signup', { 
          state: { email } // Pass email to signup page
        });
      } else {
        if (data.message === "User already exists") {
          navigate('/login');
        } else {
          setError(data.message || 'Failed to sign up. Please try again.');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Track Your Next <span className="text-blue-600">Investment</span> Opportunity
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Stay ahead of the market with our comprehensive IPO tracking platform. 
              Get real-time updates, detailed analysis, and expert insights for upcoming public offerings.
            </p>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleEmailSignup} className="mt-8">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Start now'}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-red-600 text-sm">{error}</p>
                )}
                <p className="mt-3 text-sm text-gray-500">
                  By clicking "Start now" you agree to our Terms & Conditions.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;