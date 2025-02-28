import { Router } from "express";
import {
  getAllVendors,
  setupProfile,
  getProfile,
  editProfile,
  bookVendor,
  getNotifications,
  getMyBookings,
  getVendorDetails
} from "../controllers/user.controllers.js";

const router = Router();

// Public route - Anyone can view vendors
router.get("/vendors", getAllVendors); 
router.get("/vendors/:vendorId", getVendorDetails); // More RESTful vendor details route

// Profile-related routes (users send their userId in the request body)
router.post("/profile/setup", setupProfile);
router.get("/profile", getProfile);
router.patch("/profile", editProfile); // PATCH for updates (consistent naming)

// Booking routes
router.post("/bookings", bookVendor); // More RESTful endpoint
router.get("/my-bookings", getMyBookings); // Avoids conflict with bookings creation

// Notifications
router.get("/notifications", getNotifications);

export default router;
