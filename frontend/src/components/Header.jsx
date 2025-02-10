import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All IPOs");

  const options = ["All IPOs", "Current", "Announced", "Closed"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-24 h-auto rounded-lg"/>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-12">
            <div className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search IPOs..."
                  className="w-full px-4 py-2 pl-10 pr-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                
                {/* Dropdown Button */}
                <div className="absolute right-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {selectedOption}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </a>
              </li>
              <li>
                <a 
                  href="/get-started" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;