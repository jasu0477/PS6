import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Phone, UserCheck, Lock, Eye, EyeOff, MapPin } from "lucide-react";
import MiniNavbar from "../../components/Others/MiniNavbar";

const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna",  "Assagao",
];

const UserSetup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userData.name || !userData.address || !userData.city || !userData.phone || !userData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage("");
    console.log("User Profile Data:", userData);
    alert("User Profile Setup Successful!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-base-200">
      <MiniNavbar />
      <div className="flex flex-grow items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-base-300 shadow-lg p-10 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-base-content mb-8">User Setup</h2>
          {errorMessage && <div className="text-red-500 text-center font-semibold mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="text" name="name" placeholder="Enter your full name" required className="input input-bordered w-full pl-12 mt-2" onChange={handleChange} />
                <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold">Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="text" name="address" placeholder="Enter your address" required className="input input-bordered w-full pl-12 mt-2" onChange={handleChange} />
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold">City <span className="text-red-500">*</span></label>
              <div className="relative">
                <select name="city" required value={userData.city} onChange={handleChange} className="select select-bordered w-full mt-2 pl-12">
                  <option value="">Select City</option>
                  {goaCities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="tel" name="phone" placeholder="Enter your phone number" required className="input input-bordered w-full pl-12 mt-2" onChange={handleChange} />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold">Create Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" required className="input input-bordered w-full pl-12 pr-12 mt-2" onChange={handleChange} />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <EyeOff className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary text-lg px-12 py-3 w-full md:w-auto">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSetup;