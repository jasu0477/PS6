import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiErrors } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { User } from "../models/user.models.js";
import { Vendor } from "../models/vendor.models.js";
import { Admin } from "../models/admin.models.js";


export const handleAuth0Login = asyncHandler(async (req, res) => {
  const { auth0Id, email, name, role } = req.body;

  if (!auth0Id || !email || !name || !role) {
    throw new ApiErrors(400, "Missing required fields");
  }

  let user;

  // Store user based on role
  if (role === "user") {
    user = await User.findOneAndUpdate(
      { auth0Id }, 
      { name, email }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } else if (role === "vendor") {
    user = await Vendor.findOneAndUpdate(
      { auth0Id }, 
      { name, email }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } else if (role === "admin") {
    user = await Admin.findOneAndUpdate(
      { auth0Id }, 
      { name, email }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } else {
    throw new ApiErrors(400, "Invalid role");
  }

  res.status(200).json(new ApiResponse(200, user, "Login successful"));
});
