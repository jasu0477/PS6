import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { 
  LucideClock, 
  LucideShieldCheck, 
  LucideDollarSign, 
  LucideCheckCircle, 
  LucideCalendarCheck, 
  LucideThumbsUp,
  LucideUsers,
  LucideCalendar,
  LucideHardHat,
  LucideArrowUp
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-base-200 text-white font-sans overflow-hidden">
      <div className="absolute top-6 left-8 z-20">
        <div className="text-3xl font-bold text-primary">HandyGo</div>
      </div>
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">What Are Your Needs?</h1>
        <div className="mt-6 flex gap-6">
          <button className="btn-glass animate-fade-in-up" onClick={() => navigate("/user/setup")}>
            Need a Hand
          </button>
          <button className="btn-glass animate-fade-in-up delay-500" onClick={() => navigate("/vendor/signup")}>
            Lend a Hand
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;