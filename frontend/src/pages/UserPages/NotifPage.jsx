import React, { useState } from "react";
import { XCircle } from "lucide-react"; // Importing the delete icon
import Navbar from "../../components/User/UserHomePage/Navbar";

const mockNotifications = [
  {
    id: 1,
    serviceType: "Plumbing",
    vendorName: "Arun Patel",
    location: "Panaji, Goa",
    date: "March 10, 2025",
    time: "10:00 AM",
    serviceCharge: "₹500",
    workDescription: "Fixing a leaking pipe in the kitchen",
    status: "Accepted",
  },
  {
    id: 2,
    serviceType: "Electrical Work",
    vendorName: "Ravi Kumar",
    location: "Margao, Goa",
    date: "March 12, 2025",
    time: "2:30 PM",
    serviceCharge: "₹700",
    workDescription: "Installation of new ceiling fan",
    status: "Pending",
  },
  {
    id: 3,
    serviceType: "Carpentry",
    vendorName: "Vikram Sharma",
    location: "Vasco da Gama, Goa",
    date: "March 15, 2025",
    time: "4:00 PM",
    serviceCharge: "₹1,200",
    workDescription: "Repairing and polishing a wooden dining table",
    status: "Completed",
  },
  
];

const NotifPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  // Function to remove a notification from the list
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="relative bg-[#0b0f19] text-white min-h-screen flex flex-col">
      {/* Navbar (Full Width, Isolated) */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-lg">
        <Navbar />
      </div>

      {/* Content (With Proper Margin Below Navbar) */}
      <div className="flex flex-col items-center mt-24 px-6">
        {/* Page Heading */}
        <h2 className="text-4xl font-bold text-primary mt-12 mb-6 text-center">Notifications</h2>

        {/* Notification List (Centered Items) */}
        <div className="flex flex-col items-center w-full max-w-2xl">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-[#1a2332] w-full p-4 rounded-lg mb-4 shadow-md border border-gray-700 text-white transition-all duration-300 
                         hover:shadow-xl hover:border-primary hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-primary/50"
            >
              <div className="relative">
                <p className="text-lg font-semibold text-primary">{notification.vendorName}</p>
                <p className="text-sm text-gray-400">{notification.serviceType} - {notification.location}</p>
                <p className="text-sm">Date: {notification.date} at {notification.time}</p>
                <p className="text-sm text-gray-400">{notification.workDescription}</p>
                <p className="text-sm font-semibold">Charge: {notification.serviceCharge}</p>
                <p className={`text-sm font-bold mt-2 
                  ${notification.status === "Completed" ? "text-green-400" : notification.status === "Pending" ? "text-yellow-400" : "text-blue-400"}`}>
                  {notification.status}
                </p>

                {/* Remove Notification Button */}
                <button onClick={() => removeNotification(notification.id)} 
                  className="absolute top-3 right-3 text-red-400 hover:text-red-500 transition-all">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotifPage;
