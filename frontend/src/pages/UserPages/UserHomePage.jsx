import React from "react";
import { Wrench, Zap, Hammer, MonitorSmartphone, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/User/UserHomePage/ServiceCard";
import Navbar from "../../components/User/UserHomePage/Navbar"
import Footer from "../../components/Others/Footer"
// Mock data for services
const services = [
  { title: "Plumbing", icon: Wrench, description: "Leak repairs, pipe fittings, and more." },
  { title: "Electrical Work", icon: Zap, description: "Wiring, installations, and safety checks." },
  { title: "Carpentry", icon: Hammer, description: "Furniture repairs and woodwork solutions." },
  { title: "Appliance Repairs", icon: MonitorSmartphone, description: "Fixing home appliances efficiently." },
  { title: "Home Maintenance", icon: Home, description: "General upkeep and handyman services." },
];

const UserHomePage = () => {
  const navigate = useNavigate();

  // Handle click on the service card to navigate to the specific service page
  const handleCardClick = () => {
    // Filter is automatically handled by the navigate logic inside ServiceCard
  };

  return (
    <>
    <Navbar/>
      <div className="text-center my-6 mt-11">
        <p className="text-3xl text-primary">HandyGo – Handy Help, On the Go!</p>
      </div>
      <div className="flex flex-col items-center gap-10">
        {/* First Row of Services */}
        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              onClick={handleCardClick} // Handle click to navigate
            />
          ))}
        </div>
        {/* Second Row of Services */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              onClick={handleCardClick} // Handle click to navigate
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserHomePage;
