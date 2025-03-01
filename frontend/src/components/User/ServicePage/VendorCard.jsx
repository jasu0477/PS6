import { Briefcase, Languages, MapPin, Star } from "lucide-react"; // Assuming you have these icons
import { useNavigate } from "react-router-dom";

const VendorCard = ({ vendor }) => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleCardClick = () => {
    // Navigate to the booking page and pass vendor data as state
    navigate('/user/booking', { state: { vendor } });
  };

  return (
    <div
      className="bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer relative"
      onClick={handleCardClick} // On click, navigate to the booking page
    >
      <h3 className="text-xl font-semibold mb-3">{vendor.name}</h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-400 text-sm">
        {/* Job Type */}
        <div className="flex items-center gap-2">
          <Briefcase size={18} />
          <span>{vendor.jobType}</span>
        </div>

        {/* Languages Known */}
        <div className="col-span-2 flex items-center gap-2">
          <Languages size={18} />
          <span>{vendor.languagesKnown.length ? vendor.languagesKnown.join(", ") : "No languages specified"}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span>{vendor.location}</span>
        </div>

        {/* Rating */}
        <div className="col-span-2 flex justify-between items-center mt-1">
          <div className="flex items-center gap-2 text-yellow-400">
            <Star size={18} />
            <span>{vendor.rating} Stars</span>
          </div>
        </div>
      </div>

      {/* Charge per hour */}
      <div className="absolute bottom-4 right-4 text-green-500 font-bold flex items-center gap-1">
        <span>₹</span>
        <span>{vendor.chargePerHour}</span>
      </div>
    </div>
  );
};

export default VendorCard;
