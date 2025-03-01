import React, { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Initial work requests
const initialWorkRequests = [
  { id: 1, customer: "John Doe", location: "Downtown, NY", date: "Feb 29, 2024" },
  { id: 2, customer: "Jane Smith", location: "Uptown, NY", date: "Mar 1, 2024" },
  { id: 3, customer: "Alex Johnson", location: "Brooklyn, NY", date: "Mar 2, 2024" },
  { id: 4, customer: "Michael Brown", location: "Queens, NY", date: "Mar 3, 2024" },
  { id: 5, customer: "Emily Davis", location: "Bronx, NY", date: "Mar 4, 2024" },
  { id: 6, customer: "David Miller", location: "Manhattan, NY", date: "Mar 5, 2024" },
];

const WorkList = ({ setNotifications }) => {
  const [jobs, setJobs] = useState(initialWorkRequests);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'accept' or 'reject'

  // Open the modal and store job details
  const openModal = (job, action) => {
    setSelectedJob(job);
    setActionType(action);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setActionType(null);
  };

  // Handle Accept
  const handleAccept = () => {
    if (selectedJob) {
      toast.success("Work Accepted!", { 
        style: { background: "#4CAF50", color: "#fff" },
        position: window.innerWidth <= 768 ? "bottom-center" : "top-center"
      });

      // Add the accepted job to notifications
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: selectedJob.id,
          client: selectedJob.customer,
          date: selectedJob.date,
          location: selectedJob.location,
          time: "12:00 PM", // Default time, update as needed
        },
      ]);

      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    }
    closeModal();
  };

  // Handle Reject
  const handleReject = () => {
    if (selectedJob) {
      toast.error("Work Rejected", { 
        style: { background: "#D32F2F", color: "#fff" },
        position: window.innerWidth <= 768 ? "bottom-center" : "top-center"
      });
      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    }
    closeModal();
  };

  // Process action based on action type
  const processAction = () => {
    if (actionType === 'accept') {
      handleAccept();
    } else if (actionType === 'reject') {
      handleReject();
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300 mb-3 md:mb-6 text-center">
        New Work Requests
      </h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 overflow-y-auto max-h-screen sm:max-h-full">
          {jobs.map((work) => (
            <div 
              key={work.id} 
              className="bg-[#1a2332] bg-opacity-80 border border-gray-700 backdrop-blur-lg p-3 sm:p-4 md:p-5 rounded-xl shadow-md"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white">{work.customer}</h3>
              <p className="text-gray-400 flex items-center gap-2 mt-2 text-sm sm:text-base">
                <MapPin size={16} className="flex-shrink-0" /> 
                <span className="truncate">{work.location}</span>
              </p>
              <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm sm:text-base">
                <Calendar size={16} className="flex-shrink-0" /> {work.date}
              </p>

              {/* Flexbox container to hold the buttons */}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                <button
                  onClick={() => openModal(work, 'accept')}
                  className="flex-1 py-1 sm:py-1.5 px-1 sm:px-2 text-xs sm:text-sm rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => openModal(work, 'reject')}
                  className="flex-1 py-1 sm:py-1.5 px-1 sm:px-2 text-xs sm:text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#1a2332] bg-opacity-60 backdrop-blur-lg p-6 rounded-lg border border-gray-800 mt-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold text-white mb-2">No work requests</h3>
            <p className="text-gray-400 max-w-md">
              When new work requests come in, they will appear here
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-[#1a2332] text-white p-4 sm:p-5 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm border border-purple-900/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-purple-200">Confirm Action</h2>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-5">
              Do you want to {actionType === 'accept' ? 'accept' : 'reject'} this job from {selectedJob?.customer}?
            </p>

            <div className="flex gap-2 sm:gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={processAction}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-white rounded-md transition ${
                  actionType === 'accept' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionType === 'accept' ? 'Accept' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkList;
