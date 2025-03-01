import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { ChevronLeft } from 'lucide-react'; // Import ChevronLeft for left arrow icon
import MiniNavbar from '../../components/Others/MiniNavbar';
import BookingCard from '../../components/User/BookingPage/BookingCard';
import WorkDesc from '../../components/User/BookingPage/WorkDesc';
import DateTime from '../../components/User/BookingPage/DateTime';

const BookingPage = () => {
  const location = useLocation(); // Use useLocation to access state
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const { vendor } = location.state; // Grab the vendor object passed in state

  const [workDescription, setWorkDescription] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      setBookingSuccess(true);
      setBookingConfirmed(true);
    }
  };

  const handleGoHome = () => {
    navigate('/user/home');
    window.scroll(0, 0); // Navigate to user home page
  };

  const handleGoBack = () => {
    navigate('/user/service'); // Navigate back to service page
  };

  return (
    <>
      <MiniNavbar />
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex justify-center items-center mb-6">
          {/* Back Button */}
          <button
          className="btn btn-ghost flex items-center gap-2 text-base absolute left-80" // Adjusted to left-6 for a little more right alignment
          onClick={handleGoBack}
          >
          <ChevronLeft size={20} /> {/* Left arrow icon */}
          <span>Back</span>
          </button>

          <h1 className="text-2xl font-bold text-center">Book a Service</h1>
        </div>

        {/* Vendor Card Component with passed vendor data */}
        <BookingCard vendor={vendor} />

        {/* Work Description Component */}
        <WorkDesc onSave={setWorkDescription} />

        {/* DateTime Component for booking options, date and time selection */}
        <DateTime onDateTimeSelect={setBookingDetails} />

        {/* Booking Summary */}
        {bookingDetails && (
          <div className="card bg-base-200 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title text-lg">
                {bookingConfirmed ? (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-success mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Booking Confirmed
                  </div>
                ) : (
                  'Booking Summary'
                )}
              </h3>

              {/* Vendor Name at the top */}
              <div className="flex items-center mb-1 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="font-medium">Vendor: {vendor.name}</p>
              </div>

              <div>
                {/* Service Type */}
                <div className="flex items-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Service: {vendor.jobType}</p>
                </div>

                {/* Charge Per Hour */}
                <div className="flex items-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>Charge Per Hour: ₹{vendor.chargePerHour}</p>
                </div>

                {/* Date and Time */}
                <div className="flex items-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 2V6M18 2V6M4 6H20M4 6C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6H4z"
                    />
                  </svg>
                  <p>Date and Time: {bookingDetails.date} at {bookingDetails.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Button */}
        {!bookingConfirmed && (
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-primary"
              onClick={handleBook}
            >
              Book Now
            </button>
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-lg font-semibold">Confirm your booking</h2>
              <div className="flex justify-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleConfirm(true)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Go to Home Button after booking confirmation */}
        {bookingConfirmed && (
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-success"
              onClick={handleGoHome}
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
