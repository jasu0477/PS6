import React, { useState } from "react";
import { LucideCalendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ job }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  // Mock data for testing (used if job is undefined)
  const mockJob = {
    id: "mock123",
    date: "March 5, 2025",
    time: "2:30 PM",
    client: "John Doe",
    location: "Panaji, Goa",
  };

  // Use actual job data if available, otherwise use mock data
  const jobData = job || mockJob;

  if (!visible) return null;

  return (
    <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-5 rounded-lg shadow-md flex items-center justify-between border border-transparent transition hover:border-purple-500 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Icon for Accepted Job */}
        <LucideCalendar size={24} className="text-green-400" />
        
        {/* Job Details */}
        <div>
          <h3 className="text-lg font-semibold text-white">Accepted Job</h3>
          <p className="text-gray-400 text-sm">Client: {jobData.client}</p>
          <p className="text-gray-400 text-sm">Date: {jobData.date}</p>
          <p className="text-gray-400 text-sm">Time: {jobData.time}</p>
          <p className="text-gray-400 text-sm">Location: {jobData.location}</p>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Go to Work Details Button */}
        <button
          onClick={() => navigate("/vendor/work")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600"
        >
          View Details
        </button>

     
      </div>
    </div>
  );
};

export default NotificationItem;
