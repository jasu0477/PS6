import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from "chart.js";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { 
  LucideUser, 
  LucideWrench, 
  LucideClock, 
  LucideDollarSign,
  LucideStar,
  LucideCalendar,
  LucideWaves,
  LucideAward,
  LucideBriefcase,
  LucideCircle
} from "lucide-react";
import VendorHomeNavbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar"; // Import the navbar component

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

// Main Dashboard Page
const VendorDashboard = () => {
  const navigate = useNavigate();
  // State for online status
  const [isOnline, setIsOnline] = useState(true);

  // Toggle online status - to be connected to navbar toggle
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  // Sample data - in a real app, this would come from API
  const vendorData = {
    name: "John",  // Added a name for the welcome message
    specialization: "Plumbing",
    totalJobs: 45,
    earnings: 12500,
    rating: 4.8,
    hoursWorked: 120,
    completionRate: 92,
    responseTime: "15 mins",
    pendingJobs: 3,
    weeklyStats: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      workCompleted: [2, 3, 1, 4, 2, 5, 3],
      hoursWorked: [5, 6, 3, 7, 4, 8, 6],
      revenue: [1200, 800, 1500, 950, 1100, 700, 1300]
    },
    jobTypes: [
      { type: "Pipe Repairs", count: 18 },
      { type: "Installation", count: 14 },
      { type: "Leakage Fix", count: 9 },
      { type: "Maintenance", count: 4 }
    ],
    monthlyRevenue: [8000, 9500, 7800, 10200, 12500, 11000],
    months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    skills: [
      { type: "Pipe Fitting", score: 95 },
      { type: "Leak Detection", score: 90 },
      { type: "Installation", score: 85 },
      { type: "Maintenance", score: 80 },
      { type: "Emergency Repair", score: 75 }
    ]
  };

  // Chart data
  const workDoneData = {
    labels: vendorData.weeklyStats.days,
    datasets: [
      {
        label: "Work Completed",
        data: vendorData.weeklyStats.workCompleted,
        backgroundColor: "rgba(156, 39, 176, 0.7)",
        borderColor: "rgba(156, 39, 176, 1)",
        borderWidth: 2,
      },
    ],
  };

  const hoursWorkedData = {
    labels: vendorData.weeklyStats.days,
    datasets: [
      {
        label: "Hours Worked",
        data: vendorData.weeklyStats.hoursWorked,
        backgroundColor: "rgba(103, 58, 183, 0.7)",
        borderColor: "rgba(103, 58, 183, 1)",
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: vendorData.weeklyStats.days,
    datasets: [
      {
        label: "Daily Revenue (₹)",
        data: vendorData.weeklyStats.revenue,
        backgroundColor: "rgba(171, 71, 188, 0.7)",
        borderColor: "rgba(171, 71, 188, 1)",
        borderWidth: 2,
      },
    ],
  };

  const jobTypeData = {
    labels: vendorData.jobTypes.map(job => job.type),
    datasets: [
      {
        data: vendorData.jobTypes.map(job => job.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: vendorData.months,
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        data: vendorData.monthlyRevenue,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ],
  };

  const skillsData = {
    labels: vendorData.skills.map(skill => skill.type),
    datasets: [
      {
        label: 'Skill Level',
        data: vendorData.skills.map(skill => skill.score),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      }
    ],
  };

  return (
    <div className="relative bg-[#0b0f19] text-white font-poppins min-h-screen overflow-hidden">
      {/* Use the imported Navbar component with the toggle function */}
      <VendorHomeNavbar onToggleStatus={toggleOnlineStatus} />
      
      {/* Dashboard Content */}
      <div className="pt-32 pb-12 px-8 max-w-7xl mx-auto">
        {/* Welcome Section with Specialization and Online Status */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to HandyGo</h1>
              <div className="flex items-center mb-2">
                <LucideWrench className="mr-2 text-primary" />
                <p className="text-xl opacity-90">{vendorData.specialization} Specialist</p>
              </div>
              <div className="flex items-center mt-4">
  <div className={`flex items-center ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
    <LucideCircle size={12} className={`mr-2 ${isOnline ? 'fill-green-400' : 'fill-red-400'}`} />
    <span className="font-medium">{isOnline ? 'Online - Ready for Jobs' : 'Offline - Taking a Break'}</span>
  </div>
</div>
            </div>
            <div className="bg-[#1a2332] p-4 rounded-lg shadow">
              <div className="text-center">
                <p className="text-lg text-gray-300 mb-1">Current Status</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full ${isOnline ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
  <LucideCircle size={8} className={`mr-2 ${isOnline ? 'fill-green-400' : 'fill-red-400'}`} />
  <span>{isOnline ? 'Available' : 'Unavailable'}</span>
</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Stats */}
        <h2 className="text-3xl font-bold text-primary mb-6">Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Jobs */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-figure text-primary">
                <LucideWrench size={24} />
              </div>
              <div className="stat-title text-gray-300">Total Jobs</div>
              <div className="stat-value text-primary">{vendorData.totalJobs}</div>
              <div className="stat-desc text-gray-400">Completed jobs</div>
            </div>
          </div>
          
          {/* Total Earnings */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-figure text-green-400">
                <LucideDollarSign size={24} />
              </div>
              <div className="stat-title text-gray-300">Earnings</div>
              <div className="stat-value text-green-400">₹{vendorData.earnings.toLocaleString()}</div>
              <div className="stat-desc text-gray-400">Total revenue</div>
            </div>
          </div>
          
          {/* Customer Rating */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-figure text-yellow-400">
                <LucideStar size={24} />
              </div>
              <div className="stat-title text-gray-300">Rating</div>
              <div className="stat-value text-yellow-400">{vendorData.rating} ⭐</div>
              <div className="stat-desc text-gray-400">Customer feedback</div>
            </div>
          </div>
          
          {/* Hours Worked */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-figure text-blue-400">
                <LucideClock size={24} />
              </div>
              <div className="stat-title text-gray-300">Hours Worked</div>
              <div className="stat-value text-blue-400">{vendorData.hoursWorked}h</div>
              <div className="stat-desc text-gray-400">Total time</div>
            </div>
          </div>
        </div>
        
        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Completion Rate */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Completion Rate</div>
              <div className="stat-value text-green-500">{vendorData.completionRate}%</div>
              <div className="stat-desc text-gray-400">Jobs completed successfully</div>
            </div>
          </div>
          
          {/* Response Time */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Avg. Response Time</div>
              <div className="stat-value text-purple-400">{vendorData.responseTime}</div>
              <div className="stat-desc text-gray-400">Time to accept new jobs</div>
            </div>
          </div>
          
          {/* Pending Jobs */}
          <div className="stats shadow bg-[#1a2332] text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Pending Jobs</div>
              <div className="stat-value text-amber-400">{vendorData.pendingJobs}</div>
              <div className="stat-desc text-gray-400">Jobs in progress</div>
            </div>
          </div>
        </div>
        
        {/* Weekly Stats Charts */}
        <h2 className="text-3xl font-bold text-primary mb-6">Weekly Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Work Completed Chart */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Work Completed</h3>
            <div className="h-64">
              <Bar 
                data={workDoneData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Hours Worked Chart */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Hours Worked</h3>
            <div className="h-64">
              <Bar 
                data={hoursWorkedData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Daily Revenue Chart */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Daily Revenue (₹)</h3>
            <div className="h-64">
              <Bar 
                data={revenueData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Advanced Analytics */}
        <h2 className="text-3xl font-bold text-primary mb-6">Advanced Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Job Types Breakdown */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Job Types</h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut 
                data={jobTypeData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'white',
                        padding: 20
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Monthly Revenue Trend */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Revenue Trend</h3>
            <div className="h-64">
              <Line 
                data={monthlyRevenueData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Skills Analysis */}
          <div className="bg-[#1a2332] bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary text-center mb-4">Skills Analysis</h3>
            <div className="h-64">
              <Radar 
                data={skillsData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    r: {
                      angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                      },
                      pointLabels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                          size: 12
                        }
                      },
                      ticks: {
                        backdropColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Suggestions Section with General Tips */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a2332] bg-opacity-30 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">Optimization Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <LucideWaves className="mr-2 text-blue-300 mt-1 flex-shrink-0" size={16} />
                  <span>Quick response times increase your chances of being hired by up to 45%</span>
                </li>
                <li className="flex items-start">
                  <LucideWaves className="mr-2 text-blue-300 mt-1 flex-shrink-0" size={16} />
                  <span>Weekends show higher earning potential - consider adjusting your availability</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#1a2332] bg-opacity-30 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-300 mb-2">Growth Opportunities</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <LucideAward className="mr-2 text-purple-300 mt-1 flex-shrink-0" size={16} />
                  <span>Additional certifications can help increase your hourly rate by 15-20%</span>
                </li>
                <li className="flex items-start">
                  <LucideAward className="mr-2 text-purple-300 mt-1 flex-shrink-0" size={16} />
                  <span>Taking photos of completed work improves customer satisfaction and ratings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;