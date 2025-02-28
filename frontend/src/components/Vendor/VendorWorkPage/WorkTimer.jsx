import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucidePlay, LucideStopCircle, LucideRotateCcw, LucideX } from "lucide-react";

// Modal Component
const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <LucideX size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
        <p className="mb-6 font-semibold text-red-500">⚠ Please notify the user before proceeding.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-outline btn-neutral">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-primary">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmText: "Confirm",
    onConfirm: () => {}
  });

  const navigate = useNavigate();

  const formatTime = (milliseconds) => {
    const hrs = Math.floor(milliseconds / 3600000);
    const mins = Math.floor((milliseconds % 3600000) / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const openModal = (title, message, confirmText, onConfirm) => {
    setModalConfig({ title, message, confirmText, onConfirm });
    setModalOpen(true);
  };

  const startTimer = () => {
    openModal("Start Timer", "Please notify the user that the timer is starting.", "Start", () => {
      if (!isRunning) {
        setIsRunning(true);
        const startTime = Date.now() - time;
        const id = setInterval(() => {
          setTime(Date.now() - startTime);
        }, 10);
        setIntervalId(id);
      }
    });
  };

  const stopTimer = () => {
    openModal("Stop Timer", "Please notify the user that the timer is stopping.", "Move to Checkout", () => {
      clearInterval(intervalId);
      setIsRunning(false);
      navigate("/vendor/checkout");
    });
  };

  const resetTimer = () => {
    openModal("Reset Timer", "Please notify the user that the timer is being reset.", "Reset", () => {
      setIsRunning(false);
      clearInterval(intervalId);
      setTime(0);
    });
  };

  return (
    <div className="bg-[#1a2332] p-8 rounded-lg shadow-lg mt-8 
                    border-2 border-transparent 
                    hover:border-[oklch(var(--p))]  
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-purple-500/20 
                    animate-fadeIn flex flex-col items-center relative">
      
      {/* Modal */}
      <Modal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={() => {
          modalConfig.onConfirm();
          setModalOpen(false);
        }}
      />

      {/* Reset Button (Top Right) */}
      <button 
        onClick={resetTimer} 
        className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-500 transition"
      >
        <LucideRotateCcw size={22} />
      </button>

      {/* Timer Title */}
      <h3 className="text-2xl font-semibold text-primary mb-4">Job Timer</h3>

      {/* Timer Display */}
      <p className="text-5xl font-mono text-gray-300">{formatTime(time)}</p>

      {/* Buttons */}
      <div className="mt-6 flex gap-6">
        <button
          onClick={startTimer}
          className="btn btn-success flex items-center gap-2"
          disabled={isRunning}
        >
          <LucidePlay size={20} />
          Start
        </button>
        <button
          onClick={stopTimer}
          className="btn btn-error flex items-center gap-2"
          disabled={!isRunning}
        >
          <LucideStopCircle size={20} />
          Stop
        </button>
      </div>
    </div>
  );
};

export default WorkTimer;
