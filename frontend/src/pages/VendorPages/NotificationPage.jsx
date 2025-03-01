import React, { useState } from "react";
import VendorHomeNavbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar";
import NotificationList from "../../components/Vendor/VendorNotificationPage/NotificationList";
import WorkList from "../../components/Vendor/VendorHomePage/WorkList";
import { Bell, Briefcase } from "lucide-react";


const NotificationPage = () => {
  // Notifications state
  const [notifications, setNotifications] = useState([
    // Sample data - you can remove this or replace with actual data
    {
      id: "job1",
      date: "March 5, 2025",
      time: "2:30 PM",
      client: "John Doe",
      location: "Panaji, Goa",
    },
    {
      id: "job2",
      date: "March 8, 2025",
      time: "10:00 AM",
      client: "Sarah Williams",
      location: "Margao, Goa",
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0f1219] text-white">
      {/* Navbar */}
      <VendorHomeNavbar />

      {/* Page Content */}
      <div className="container mx-auto pt-24 pb-16 px-4 md:px-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 mb-10 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Notifications</h1>
          <p className="text-purple-200">View and manage your job notifications and work requests</p>
        </div>

        {/* Side by Side Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Notifications Section */}
          <section>
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="bg-purple-700 p-2 rounded-lg">
                <Bell size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>
            
            <div className="bg-[#1a2032] rounded-xl p-6 shadow-lg border border-purple-900/30 h-full">
              <NotificationList notifications={notifications} />
            </div>
          </section>
          
          {/* Work Requests Section */}
          <section>
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="bg-purple-700 p-2 rounded-lg">
                <Briefcase size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">New Work Requests</h2>
            </div>
            
            <div className="bg-[#1a2032] rounded-xl p-6 shadow-lg border border-purple-900/30 h-full">
              <WorkList setNotifications={setNotifications} />
            </div>
          </section>
        </div>

        {/* Performance Overview */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Performance Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Jobs Card */}
            <div className="bg-[#1a2032] rounded-xl p-6 shadow-lg border border-purple-900/30">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Total Jobs</h3>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-bold text-blue-400">45</p>
                <span className="text-sm text-gray-400">Completed jobs</span>
              </div>
            </div>
            
            {/* Response Time Card */}
            <div className="bg-[#1a2032] rounded-xl p-6 shadow-lg border border-purple-900/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Avg. Response Time</h3>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-bold text-purple-400">15 mins</p>
                <span className="text-sm text-gray-400">Time to accept jobs</span>
              </div>
            </div>
            
            {/* Completion Rate Card */}
            <div className="bg-[#1a2032] rounded-xl p-6 shadow-lg border border-purple-900/30">
              <h3 className="text-lg font-semibold text-green-300 mb-2">Completion Rate</h3>
              <div className="flex justify-between items-center">
                <p className="text-4xl font-bold text-green-400">92%</p>
                <span className="text-sm text-gray-400">Jobs completed successfully</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationPage;