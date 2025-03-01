import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  
  // Chart data for different time periods
  const weeklyData = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    workCompleted: [2, 3, 1, 4, 2, 5, 3],
    hoursWorked: [5, 6, 3, 7, 4, 8, 6],
    revenue: [1200, 800, 1500, 950, 1100, 700, 1300],
  };
  
  const monthlyData = {
    days: ["Week 1", "Week 2", "Week 3", "Week 4"],
    workCompleted: [12, 9, 15, 10],
    hoursWorked: [24, 20, 28, 26],
    revenue: [5500, 4200, 6300, 4800],
  };

  // Active data based on selected period
  const activeData = activeTab === "weekly" ? weeklyData : monthlyData;

  // Doughnut chart data for job categories
  const jobCategoriesData = {
    labels: ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Other'],
    datasets: [
      {
        data: [15, 10, 8, 7, 5],
        backgroundColor: [
          'rgba(156, 39, 176, 0.7)',
          'rgba(103, 58, 183, 0.7)',
          'rgba(63, 81, 181, 0.7)',
          'rgba(33, 150, 243, 0.7)',
          'rgba(0, 188, 212, 0.7)',
        ],
        borderColor: [
          'rgba(156, 39, 176, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(0, 188, 212, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Line chart data for revenue trend
  const revenueTrendData = {
    labels: activeData.days,
    datasets: [
      {
        label: 'Revenue Trend (₹)',
        data: activeData.revenue,
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(124, 58, 237, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  // Bar chart for work completed
  const workCompletedData = {
    labels: activeData.days,
    datasets: [
      {
        label: "Work Completed",
        data: activeData.workCompleted,
        backgroundColor: "rgba(156, 39, 176, 0.7)",
        borderColor: "rgba(156, 39, 176, 1)",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  // Bar chart for hours worked
  const hoursWorkedData = {
    labels: activeData.days,
    datasets: [
      {
        label: "Hours Worked",
        data: activeData.hoursWorked,
        backgroundColor: "rgba(103, 58, 183, 0.7)",
        borderColor: "rgba(103, 58, 183, 1)",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Poppins', sans-serif",
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 35, 50, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(124, 58, 237, 0.5)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Poppins', sans-serif",
        },
        titleFont: {
          family: "'Poppins', sans-serif",
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Poppins', sans-serif",
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Poppins', sans-serif",
          }
        }
      }
    }
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Poppins', sans-serif",
          },
          padding: 10,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 35, 50, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(124, 58, 237, 0.5)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
  };

  return (
    <div className="bg-[#0b0f19] text-white font-poppins min-h-screen overflow-x-hidden p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-0">Vendor Dashboard</h1>
          
          <div className="tabs tabs-boxed bg-[#1a2332]">
            <button 
              className={`tab ${activeTab === 'weekly' ? 'tab-active bg-primary text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`tab ${activeTab === 'monthly' ? 'tab-active bg-primary text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Jobs */}
          <div className="stats shadow bg-[#1a2332] bg-opacity-80 backdrop-blur-lg text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Total Jobs</div>
              <div className="stat-value text-primary">45</div>
              <div className="stat-desc text-success">↗︎ 8% from last period</div>
            </div>
          </div>

          {/* Earnings */}
          <div className="stats shadow bg-[#1a2332] bg-opacity-80 backdrop-blur-lg text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Earnings</div>
              <div className="stat-value text-green-400">₹12,500</div>
              <div className="stat-desc text-success">↗︎ 14% from last period</div>
            </div>
          </div>

          {/* Rating */}
          <div className="stats shadow bg-[#1a2332] bg-opacity-80 backdrop-blur-lg text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Rating</div>
              <div className="stat-value text-yellow-400">4.8 ⭐</div>
              <div className="stat-desc text-success">↗︎ 0.2 from last period</div>
            </div>
          </div>

          {/* Hours */}
          <div className="stats shadow bg-[#1a2332] bg-opacity-80 backdrop-blur-lg text-white">
            <div className="stat">
              <div className="stat-title text-gray-300">Hours Worked</div>
              <div className="stat-value text-blue-400">120h</div>
              <div className="stat-desc text-success">↗︎ 12% from last period</div>
            </div>
          </div>
        </div>

        {/* Main charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Revenue Trend</h2>
              <div className="h-80">
                <Line data={revenueTrendData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Job Categories Chart */}
          <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Job Categories</h2>
              <div className="h-80">
                <Doughnut data={jobCategoriesData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary charts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Completed Chart */}
          <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Work Completed</h2>
              <div className="h-60">
                <Bar data={workCompletedData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Hours Worked Chart */}
          <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Hours Worked</h2>
              <div className="h-60">
                <Bar data={hoursWorkedData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Review Card 1 */}
            <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Amit Singh</h3>
                  <div className="badge badge-primary">5 ⭐</div>
                </div>
                <p className="text-gray-300 text-sm">The plumbing work was excellent. Very professional and timely service.</p>
                <div className="text-xs text-gray-400 mt-2">2 days ago</div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Priya Sharma</h3>
                  <div className="badge badge-primary">4.5 ⭐</div>
                </div>
                <p className="text-gray-300 text-sm">Fixed my electrical issues quickly. Would recommend for any electrical work.</p>
                <div className="text-xs text-gray-400 mt-2">5 days ago</div>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="card bg-[#1a2332] bg-opacity-80 backdrop-blur-lg shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Rajesh Kumar</h3>
                  <div className="badge badge-primary">5 ⭐</div>
                </div>
                <p className="text-gray-300 text-sm">The painting job was perfect. Very neat and clean work with great attention to detail.</p>
                <div className="text-xs text-gray-400 mt-2">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;