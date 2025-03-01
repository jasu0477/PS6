import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ job, onAccept, onReject }) => {
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
    <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-transparent transition hover:border-purple-500 hover:shadow-lg">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Icon for Job */}
        <div className="bg-blue-500/20 p-3 rounded-full flex-shrink-0">
          <Calendar size={24} className="text-blue-400" />
        </div>
        
        {/* Job Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">New Job Request</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2">
            <p className="text-sm">
              <span className="text-gray-400">Client: </span> 
              <span className="text-gray-200">{jobData.client}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Date: </span> 
              <span className="text-gray-200">{jobData.date}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Time: </span> 
              <span className="text-gray-200">{jobData.time}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Location: </span> 
              <span className="text-gray-200">{jobData.location}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        {onAccept && onReject ? (
          <>
            <button
              onClick={() => {
                onAccept(jobData.id);
                setVisible(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm rounded-lg transition-colors w-full sm:w-20 text-center"
            >
              Accept
            </button>
            <button
              onClick={() => {
                onReject(jobData.id);
                setVisible(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded-lg transition-colors w-full sm:w-20 text-center"
            >
              Reject
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/vendor/work")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-lg transition-colors w-full sm:w-auto text-center"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
