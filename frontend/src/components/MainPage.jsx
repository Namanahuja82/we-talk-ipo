import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("MainBoard");
  const [activeStatus, setActiveStatus] = useState("Upcoming");

  const tabs = ["MainBoard", "SME", "All"];
  const statusOptions = ["Upcoming", "Announced", "Closed"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let endpoint;

        // First determine the status endpoint
        if (activeStatus === "Upcoming") {
          if (activeTab === "MainBoard") endpoint = "upcoming";
          else if (activeTab === "SME") endpoint = "upcomingSME";
          else if (activeTab === "All") endpoint = "upcomingAll";
        } else if (activeStatus === "Announced") {
          endpoint = "announced";
        } else if (activeStatus === "Closed") {
          if (activeTab === "MainBoard") endpoint = "closed";
          else if (activeTab === "SME") endpoint = "closedSME";
          else if (activeTab === "All") endpoint = "closedAll";
        }

        console.log(`Fetching data for ${activeTab} - ${activeStatus}...`);
        const response = await axios.get(`${API_URL}/${endpoint}`);

        // Handle the data based on the response structure
        if (response.data && response.data.ipos) {
          setData(response.data.ipos);
        } else if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected data structure:", response.data);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, activeStatus]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "announced":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {/* Main Board/SME/All Tabs */}
        <div className="flex-1">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Options */}
        <div className="flex gap-3">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 
                ${
                  activeStatus === status
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {activeTab} IPOs - {activeStatus}
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((ipo) => (
            <div
              key={ipo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {ipo.name}
                </h2>
                <p className="text-gray-600">
                  Offer Date: {ipo.startDate} - {ipo.endDate}
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {ipo.type || activeTab}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      activeStatus
                    )}`}
                  >
                    {activeStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No {activeStatus.toLowerCase()} IPOs found.
        </div>
      )}
    </div>
  );
};

export default MainPage;