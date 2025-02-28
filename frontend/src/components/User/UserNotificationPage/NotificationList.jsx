import React from "react";

const NotificationList = ({ notifications }) => {
  return (
    <div className="w-full max-w-4xl bg-[#1a2332] p-6 rounded-lg shadow-lg
                    border-2 border-transparent hover:border-primary 
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-primary/20 
                    animate-fadeIn">
      {/* List of Notifications */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-[#202b3c] p-4 rounded-md mb-4 shadow-md"
          >
            <h3 className="text-xl font-semibold text-primary">{notification.vendorName}</h3>
            <p className="text-gray-300"><strong>Service:</strong> {notification.serviceType}</p>
            <p className="text-gray-300"><strong>Date:</strong> {notification.date}</p>
            <p className="text-gray-300"><strong>Time:</strong> {notification.time}</p>
            <p className="text-gray-300"><strong>Charge:</strong> {notification.serviceCharge}</p>
            <p className="text-gray-300"><strong>Description:</strong> {notification.workDescription}</p>
            <p className={`text-lg font-semibold mt-2 ${
              notification.status === "Accepted" ? "text-green-400" :
              notification.status === "Pending" ? "text-yellow-400" :
              notification.status === "Completed" ? "text-blue-400" :
              "text-red-400"
            }`}>
              {notification.status}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationList;
