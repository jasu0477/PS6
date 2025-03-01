import React from "react";
import NotificationItem from "./NotificationItem";
import { Bell } from "lucide-react";

const NotificationList = ({ notifications, onAccept, onReject }) => {
  return (
    <div className="w-full space-y-4">
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            job={notification} 
            onAccept={onAccept} 
            onReject={onReject}
          />
        ))
      ) : (
        <div className="bg-[#1a2332] bg-opacity-60 backdrop-blur-lg p-8 rounded-lg border border-gray-800">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Bell size={32} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
            <p className="text-gray-400 max-w-md">
              When you receive new notifications about jobs and requests, they will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;