import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Icon for the cross button
import { useLocation, useNavigate } from "react-router-dom";

const FilterComp = ({ applyFilters, closeFilter, currentFilters }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract current filters from URL if available
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    workType: queryParams.getAll("workType") || currentFilters?.workType || [],
    location: queryParams.getAll("location") || currentFilters?.location || [],
    rating: queryParams.getAll("rating") || currentFilters?.rating || [],
    languagesKnown: queryParams.getAll("languagesKnown") || currentFilters?.languagesKnown || [],
    price: queryParams.getAll("price") || currentFilters?.price || [],
  };

  const [selectedOptions, setSelectedOptions] = useState(initialFilters);

  const workTypes = ["Plumbing", "Electrical Work", "Carpentry", "Appliance Repairs", "Home Maintenance"];
  const locations = [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
    "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
    "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
    "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
  ];
  const ratings = [1, 2, 3, 4]; // Rating: 1+, 2+, 3+, 4+
  const languages = ["English", "Hindi", "Marathi", "Konkani"];
  const prices = [
    "Under 300",
    "Under 400",
    "Under 500",
    "500 & Above",
  ];

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const query = new URLSearchParams(newFilters).toString();
    navigate(`?${query}`);
  };

  const handleFilterChange = (filterType, option) => {
    setSelectedOptions((prevState) => {
      const updatedSelection = prevState[filterType]?.includes(option)
        ? prevState[filterType].filter((item) => item !== option)
        : [...prevState[filterType], option];

      const newFilters = {
        ...prevState,
        [filterType]: updatedSelection,
      };
      updateURL(newFilters); // Update the URL with the new filters
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    applyFilters(selectedOptions);
    updateURL(selectedOptions); // Ensure URL is updated when filters are applied
  };

  return (
    <div className="bg-base-200 text-white p-6 w-full md:w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Apply Filters</h2>
        <button
          className="text-white"
          onClick={closeFilter}
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Work Type Filter */}
        <div className="flex">
          <div className="w-1/3 pr-4">
            <h3 className="font-semibold">Work Type</h3>
            {workTypes.map((type) => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  checked={selectedOptions.workType.includes(type)}
                  onChange={() => handleFilterChange("workType", type)}
                />
                {type}
              </label>
            ))}
          </div>

          {/* Location Filter */}
          <div className="w-2/3">
            <h3 className="font-semibold">Location</h3>
            {locations.map((location) => (
              <label key={location} className="block">
                <input
                  type="checkbox"
                  checked={selectedOptions.location.includes(location)}
                  onChange={() => handleFilterChange("location", location)}
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="flex">
          <div className="w-1/3 pr-4">
            <h3 className="font-semibold">Rating</h3>
            {ratings.map((rating) => (
              <label key={rating} className="block">
                <input
                  type="checkbox"
                  checked={selectedOptions.rating.includes(rating)}
                  onChange={() => handleFilterChange("rating", rating)}
                />
                {rating} & above
              </label>
            ))}
          </div>

          {/* Languages Known Filter */}
          <div className="w-2/3">
            <h3 className="font-semibold">Languages Known</h3>
            {languages.map((language) => (
              <label key={language} className="block">
                <input
                  type="checkbox"
                  checked={selectedOptions.languagesKnown.includes(language)}
                  onChange={() => handleFilterChange("languagesKnown", language)}
                />
                {language}
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold">Price</h3>
          {prices.map((price) => (
            <label key={price} className="block">
              <input
                type="checkbox"
                checked={selectedOptions.price.includes(price)}
                onChange={() => handleFilterChange("price", price)}
              />
              {price}
            </label>
          ))}
        </div>
      </div>

      <button
        className="bg-primary text-white px-4 py-2 rounded mt-4 w-full"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComp;
