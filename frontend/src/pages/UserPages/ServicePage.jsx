import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Filter } from "lucide-react"; // Icons from lucide-react
import MiniNavbar from "../../components/Others/MiniNavbar";
import FilterComp from "../../components/User/ServicePage/FilterComp";
import VendorCard from "../../components/User/ServicePage/VendorCard";

const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    workType: [],
    location: [],
    rating: [],
    languagesKnown: [],
    price: [],
  });

  const mockVendors = [
    {
      id: 1,
      name: "Arun Patel",
      jobType: "Plumbing",
      location: "Panaji",
      rating: 3.5,
      chargePerHour: 250,
      languagesKnown: ["English", "Konkani"],
    },
    {
      id: 2,
      name: "Ravi Kumar",
      jobType: "Electrical Work",
      location: "Margao",
      rating: 4.8,
      chargePerHour: 300,
      languagesKnown: ["English", "Marathi"],
    },
    {
      id: 3,
      name: "Vikram Sharma",
      jobType: "Carpentry",
      location: "Vasco da Gama",
      rating: 3.8,
      chargePerHour: 350,
      languagesKnown: ["Hindi", "Konkani"],
    },
    {
      id: 4,
      name: "Suresh Reddy",
      jobType: "Plumbing",
      location: "Candolim",
      rating: 4.1,
      chargePerHour: 450,
      languagesKnown: ["English", "Marathi"],
    },
    {
      id: 5,
      name: "Rajesh Singh",
      jobType: "Electrical Work",
      location: "Dabolim",
      rating: 4.9,
      chargePerHour: 500,
      languagesKnown: ["English", "Hindi"],
    },
  ];

  const [vendors, setVendors] = useState([]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const applyFilters = (selectedFilters) => {
    setFilters({
      workType: selectedFilters.workType || [],
      location: selectedFilters.location || [],
      rating: selectedFilters.rating || [],
      languagesKnown: selectedFilters.languagesKnown || [],
      price: selectedFilters.price || [],
    });
    setShowFilter(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Extract query parameters

    // Extract workType from URL parameters
    const workTypeParam = queryParams.get("workType");
    const locationParam = queryParams.get("location");
    const ratingParam = queryParams.get("rating");
    const priceParam = queryParams.get("price");

    let filteredVendors = mockVendors;

    // If workType is specified in URL, filter vendors by that work type
    if (workTypeParam) {
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.jobType === workTypeParam
      );
    }

    // If other filters are set (optional), filter based on those
    if (locationParam) {
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.location === locationParam
      );
    }
    if (ratingParam) {
      const ratingThreshold = parseFloat(ratingParam);
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.rating >= ratingThreshold
      );
    }
    if (priceParam) {
      filteredVendors = filteredVendors.filter((vendor) => {
        const priceRange = priceParam;
        if (priceRange === "Under 300" && vendor.chargePerHour < 300) return true;
        if (priceRange === "Under 400" && vendor.chargePerHour < 400) return true;
        if (priceRange === "Under 500" && vendor.chargePerHour < 500) return true;
        if (priceRange === "500 & Above" && vendor.chargePerHour >= 500) return true;
        return false;
      });
    }

    setVendors(filteredVendors);
  }, [location.search]); // Watch for changes to query parameters

  const handleVendorClick = (vendor) => {
    navigate("/booking", { state: { vendor } });
  };

  return (
    <div className="min-h-screen bg-base-200 text-white flex flex-col">
      <MiniNavbar />
      {showFilter && (
        <div className="w-full absolute top-16 left-0 z-10">
          <FilterComp
            applyFilters={applyFilters}
            closeFilter={() => setShowFilter(false)}
            currentFilters={filters}
          />
        </div>
      )}

      <div className={`transition-all duration-300 ${showFilter ? "ml-[320px]" : "ml-0"} flex-1`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <button
              className="bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus flex items-center gap-2 text-base"
              onClick={() => navigate("/user/home")}
            >
              <Home size={20} />
              <span>Go Back to Home</span>
            </button>

            <button
              onClick={toggleFilter}
              className="p-3 flex items-center gap-2 rounded-lg hover:bg-base-300 text-base"
            >
              <Filter size={24} />
              <span>Filter</span>
            </button>
          </div>

          {/* Display filters applied */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Applied Filters:</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {filters.workType.length > 0 && (
                <span className="badge badge-primary">{filters.workType.join(", ")}</span>
              )}
              {filters.location.length > 0 && (
                <span className="badge badge-primary">{filters.location.join(", ")}</span>
              )}
              {filters.rating.length > 0 && (
                <span className="badge badge-primary">{filters.rating.join(", ")}</span>
              )}
              {filters.languagesKnown.length > 0 && (
                <span className="badge badge-primary">{filters.languagesKnown.join(", ")}</span>
              )}
              {filters.price.length > 0 && (
                <span className="badge badge-primary">{filters.price.join(", ")}</span>
              )}
            </div>
          </div>

          {vendors.length > 0 ? (
            <div className="flex flex-col gap-4">
              {vendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onClick={() => handleVendorClick(vendor)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl">No vendors match your filter criteria</p>
              <button
                className="mt-6 bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus text-base"
                onClick={() =>
                  setFilters({
                    workType: [],
                    location: [],
                    rating: [],
                    languagesKnown: [],
                    price: [],
                  })
                }
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
