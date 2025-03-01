import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Phone, Lock, Eye, EyeOff } from "lucide-react";
import MiniNavbar from "../components/Others/MiniNavbar";
import { toast, Toaster } from "react-hot-toast"; // Correct import for react-hot-toast

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation







  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.phone || !loginData.password || !loginData.role) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage("");

    console.log("Login Data:", loginData);
    toast.success("Login Successful!", { duration: 2500, position: "top-center" });

    setTimeout(() => {
      if (loginData.role === "vendor") {
        navigate("/vendor/home");
      } else if (loginData.role === "user") {
        navigate("/user/home"); // Navigate to user home page if role is 'user'
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <MiniNavbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-lg bg-base-300 shadow-lg p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-base-content mb-6">Login</h2>

          {errorMessage && (
            <div className="text-red-500 text-center font-semibold mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="input input-bordered w-full pl-10 mt-2"
                  onChange={handleChange}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full pl-10 pr-10 mt-2"
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="role"
                  className="select select-bordered w-full mt-2 appearance-none pr-10"
                  onChange={handleChange}
                  value={loginData.role}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary text-lg px-12">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster /> {/* Add Toaster to display notifications */}
    </div>
  );
};

export default Login;