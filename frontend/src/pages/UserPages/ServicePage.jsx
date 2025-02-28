import { useState } from "react";
import MiniNavbar from "../../components/Others/MiniNavbar";
import VendorCard from "../../components/User/ServicePage/VendorCard";
import FilterComp from "../../components/User/ServicePage/FilterComp";
import { Filter, Home } from "lucide-react";

const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
];

const ServicePage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    workType: [],
    location: [],
    rating: [],
    chargePerHour: [],
    languagesKnown: [],
  });

  const toggleFilter = () => setShowFilter(!showFilter);

  const applyFilters = (selectedFilters) => {
    console.log("Applying filters:", selectedFilters);
    setFilters(selectedFilters);
    setShowFilter(false); // Close filter after applying
  };

  const vendors = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", service: "Plumbing", rating: 4, work: "Pipe fittings, leak repairs, bathroom installations.", location: "Panaji", chargePerHour: 500, languagesKnown: ["Hindi", "English"] },
    { id: 2, name: "Anjali Verma", phone: "8765432109", service: "Electrical Work", rating: 5, work: "Wiring, fan installations, circuit repairs.", location: "Margao", chargePerHour: 600, languagesKnown: ["Marathi", "English"] },
    { id: 3, name: "Amit Kumar", phone: "7654321098", service: "Plumbing", rating: 3, work: "Pipe replacements, bathroom repairs.", location: "Vasco da Gama", chargePerHour: 450, languagesKnown: ["Hindi", "Kannada"] },
  ];

  // Apply filters
  const filteredVendors = vendors.filter((vendor) => {
    const workTypeMatch = (filters.workType?.length ?? 0) === 0 || filters.workType.includes(vendor.service);
    const locationMatch = (filters.location?.length ?? 0) === 0 || filters.location.includes(vendor.location);
    const ratingMatch = (filters.rating?.length ?? 0) === 0 || filters.rating.some(r => vendor.rating >= r);
    const chargeMatch = (filters.chargePerHour?.length ?? 0) === 0 || filters.chargePerHour.some(charge => vendor.chargePerHour <= charge);
    const languageMatch = (filters.languagesKnown?.length ?? 0) === 0 || filters.languagesKnown.some(lang => vendor.languagesKnown.includes(lang));
  
    return workTypeMatch && locationMatch && ratingMatch && chargeMatch && languageMatch;
  });
  

  return (
    <div className="min-h-screen bg-base-200 text-white flex flex-col">
      <MiniNavbar />

      <div className="flex">
        {showFilter && (
          <FilterComp 
            applyFilters={applyFilters} 
            closeFilter={() => setShowFilter(false)} 
            currentFilters={filters} 
          />
        )}

        <div className={`transition-all duration-300 ${showFilter ? "ml-96" : "ml-0"} flex-1`}>
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
              <button
                className="bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus flex items-center gap-2 text-base"
                onClick={() => window.history.back()}
              >
                <Home size={20} />
                <span>Go Back to Home</span>
              </button>

              <button onClick={toggleFilter} className="p-3 flex items-center gap-2 rounded-lg hover:bg-base-300 text-base">
                <Filter size={24} />
                <span>Filter</span>
              </button>
            </div>

            {filteredVendors.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No vendors match your filter criteria</p>
                <button 
                  className="mt-6 bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus text-base"
                  onClick={() => setFilters({ workType: [], location: [], rating: [], chargePerHour: [], languagesKnown: [] })}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
