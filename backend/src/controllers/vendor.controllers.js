import { Vendor } from "../models/vendor.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";   
import { ApiErrors } from "../utils/apiError.utils.js";
import { Notification } from "../models/notification.models.js";
import { Booking } from "../models/booking.models.js";


// Get specific vendor
export const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) throw new ApiErrors(404, "Vendor not found");
  
  res.status(200).json(new ApiResponse(200, "Vendor fetched successfully", vendor));
});

// Update vendor profile
export const vendorProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
      throw new ApiErrors(400, "No data provided for update");
  }

  const vendor = await Vendor.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (!vendor) throw new ApiErrors(404, "Vendor not found");

  res.status(200).json(new ApiResponse(200, "Vendor profile updated successfully", vendor));
});

// Toggle availability
export const toggleAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vendor = await Vendor.findById(id);
  if (!vendor) throw new ApiErrors(404, "Vendor not found");
  
  vendor.isAvailable = !vendor.isAvailable;
  await vendor.save();

  res.status(200).json(new ApiResponse(200, "Availability status updated", vendor));
});

// Upload documents
export const uploadDocuments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const documentPaths = req.files.map(file => file.path);

  if (!documentPaths || documentPaths.length === 0) {
      throw new ApiErrors(400, "No documents provided");
  }

  const vendor = await Vendor.findByIdAndUpdate(
      id,
      { $set: { documents: documentPaths } },
      { new: true }
  );

  if (!vendor) throw new ApiErrors(404, "Vendor not found");

  await Notification.create({
      message: `Vendor ${vendor.name} has uploaded documents for verification`,
  });

  res.status(200).json(new ApiResponse(200, "Documents uploaded successfully", vendor));
});

// Get upcoming bookings
export const getUpcomingBookings = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bookings = await Booking.find({
      vendorId: id,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: new Date() }
  }).populate('userId', 'name phone address city');

  if (!bookings.length) throw new ApiErrors(404, "No upcoming bookings found");

  res.status(200).json(new ApiResponse(200, "Upcoming bookings fetched successfully", bookings));
});

// Respond to booking request
export const respondToBookingRequest = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { response } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiErrors(404, "Booking not found");

  if (response === "ACCEPTED") {
      booking.status = "ACCEPTED";
  } else if (response === "REJECTED") {
      booking.status = "REJECTED";
  } else {
      throw new ApiErrors(400, "Invalid response");
  }

  await booking.save();
  res.status(200).json(new ApiResponse(200, "Booking status updated successfully", booking));
});

// Timer controllers
export const startTimer = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiErrors(404, "Booking not found");
  
  booking.workStartTime = new Date();
  await booking.save();
  res.status(200).json(new ApiResponse(200, "Timer started successfully", booking));
});

export const stopTimer = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking || !booking.workStartTime) {
      throw new ApiErrors(404, "Booking not found or work not started");
  }

  booking.workEndTime = new Date();
  const durationHours = (booking.workEndTime - booking.workStartTime) / (1000 * 60 * 60);
  booking.charge *= Math.max(1, durationHours);
  booking.status = "completed";
  await booking.save();

  res.status(200).json(new ApiResponse(200, "Timer stopped successfully", booking));
});

// Complete booking
export const completeBooking = asyncHandler(async (req, res) => {
  const { bookingId, paymentMethod, transactionId } = req.body;
  if (!['cash', 'qr'].includes(paymentMethod)) {
      throw new ApiErrors(400, "Invalid payment method");
  }

  const booking = await Booking.findOne({
      _id: bookingId,
      status: 'confirmed',
      workEndTime: { $ne: null }
  });

  if (!booking) throw new ApiErrors(400, "No booking found");

  booking.status = 'completed';
  booking.paymentMethod = paymentMethod;
  if (transactionId) booking.transactionId = transactionId;
  await booking.save();

  await Notification.create({
      userId: booking.userId,
      message: `Your booking has been completed. Payment of ₹${booking.charge} received through ${paymentMethod}`,
      status: 'unread'
  });

  await Notification.create({
      vendorId: booking.vendorId,
      message: `You've completed the booking and received payment of ₹${booking.charge}`,
      status: 'unread'
  });

  return res.status(200).json(new ApiResponse(200, booking, "Booking completed successfully"));
});

// Get vendor notifications
export const getVendorNotifications = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notifications = await Notification.find({ vendorId: id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});
