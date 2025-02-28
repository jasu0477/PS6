import { Router } from "express";
import {
  getVendorById,
  vendorProfile,
  toggleAvailability,
  // getVendorNotifications,
  startTimer,
  stopTimer,
  completeBooking,
  respondToBookingRequest,
  getUpcomingBookings,
  statsController,
} from "../controllers/vendor.controllers.js";


const router = Router();



// Public route - anyone can view vendor details
router.get("/:id", getVendorById);

// Vendor-related routes (vendorId must be sent in req.body or query)
router.put("/profile", vendorProfile); // Vendor updates profile
router.patch("/availability", toggleAvailability); // Toggle availability

// Vendor Bookings
router.get("/bookings", getUpcomingBookings); // Get vendor's upcoming bookings
router.post("/booking-response/:bookingId", respondToBookingRequest); // Accept/reject booking
router.post("/start-timer/:bookingId", startTimer); // Start work timer
router.post("/stop-timer/:bookingId", stopTimer); // Stop work timer
router.post("/complete-work/:bookingId", completeBooking); // Mark work as completed

// Vendor Stats & Notifications
router.get("/stats", statsController); // Fetch vendor stats
// router.get("/notifications", getVendorNotifications); // Fetch vendor notifications

export default router;
