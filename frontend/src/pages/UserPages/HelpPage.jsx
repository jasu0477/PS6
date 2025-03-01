import React from "react";
import Navbar from "../../components/User/UserHomePage/Navbar";
import FAQItem from "../../components/Vendor/VendorHelpPage/FAQItem";
import Footer from "../../components/Others/Footer"
const faqs = [
  { 
    question: "How do I book a service?", 
    answer: "You can book a service by browsing available vendors, selecting your desired service, and confirming your booking through the app." 
  },
  { 
    question: "How do I track my service request?", 
    answer: "Once booked, you can track the status of your request in the 'My Bookings' section, where you’ll see the vendor’s arrival time and job status." 
  },
  { 
    question: "What payment options are available?", 
    answer: "We support online payments via credit/debit card, UPI, and net banking. Cash payment may also be available depending on the vendor." 
  },
  { 
    question: "Can I cancel or reschedule a booking?", 
    answer: "Yes, you can cancel or reschedule a booking before the vendor starts the job. Cancellation charges may apply based on the vendor's policy." 
  },
  { 
    question: "What should I do if I face an issue with a service?", 
    answer: "If you encounter any issues, contact our support team immediately. We are here to help and ensure a smooth experience for you." 
  },
];

const UserHelpPage = () => {
  return (
    <div className="relative bg-[#0b0f19] text-white font-poppins min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Help Page Content */}
      <section className="px-8 pt-28 pb-16 relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-primary text-center mb-8">Help & Support</h2>

        {/* FAQ Section */}
        <div className="bg-[#1a2332] p-6 rounded-lg shadow-lg
                      border-2 border-transparent hover:border-primary 
                      transition-all duration-300 ease-in-out 
                      hover:shadow-xl hover:shadow-primary/20 
                      animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 bg-[#1a2332] p-6 rounded-lg shadow-lg
                      border-2 border-transparent hover:border-primary 
                      transition-all duration-300 ease-in-out 
                      hover:shadow-xl hover:shadow-primary/20 
                      animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4">Contact Customer Support</h3>
          <p className="text-gray-400 mb-2">
            If you need any assistance, our support team is available 24/7.
          </p>
          <div className="space-y-2">
            <p className="text-lg"><span className="font-semibold text-primary">📞 Phone:</span> +91 90000 12345</p>
            <p className="text-lg"><span className="font-semibold text-primary">📞 Alternate:</span> +91 80000 54321</p>
            <p className="text-lg"><span className="font-semibold text-primary">📧 Email:</span> support@handygo.com</p>
            <p className="text-lg"><span className="font-semibold text-primary">📍 Address:</span> 123, HandyGo HQ, Panaji, Goa</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

// CSS Animation keyframes - add to your global CSS file
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

/* Primary color definition */
:root {
  --p: 0.6 0.2 290;
}
`;

export default UserHelpPage;

