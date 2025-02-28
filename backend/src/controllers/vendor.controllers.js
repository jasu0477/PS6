import { Vendor } from "../models/vendor.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ApiErrors } from "../utils/apiError.utils.js";

import { Notification } from "../models/notification.models.js";
import { Booking } from "../models/booking.models.js";


// 🔹 GET Specific Vendor
export const getVendorById = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) throw new ApiErrors(404, "Vendor not found");
    res.status(200).json(new ApiResponse(200, "Vendor fetched successfully", vendor));
});

// 🔹 Update or Setup Vendor Profile
export const vendorProfile = asyncHandler(async (req, res) => {
    const { vendorId, ...updateData } = req.body;

    if (!vendorId) throw new ApiErrors(400, "Vendor ID is required");
    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ApiErrors(400, "No data provided for update");
    }

    const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
        { $set: updateData },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!vendor) throw new ApiErrors(404, "Vendor not found");

    res.status(200).json(new ApiResponse(200, "Vendor profile updated successfully", vendor));
});

// 🔹 Toggle Vendor Availability
export const toggleAvailability = asyncHandler(async (req, res) => {
    const { vendorId } = req.body;
    if (!vendorId) throw new ApiErrors(400, "Vendor ID is required");

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) throw new ApiErrors(404, "Vendor not found");

    vendor.isAvailable = !vendor.isAvailable;
    await vendor.save();
    res.status(200).json(new ApiResponse(200, "Availability status updated", vendor));
});

// 🔹 Upload Vendor Documents
export const uploadDocuments = asyncHandler(async (req, res) => {
    const { vendorId } = req.body;
    if (!vendorId) throw new ApiErrors(400, "Vendor ID is required");

    const documentPaths = req.files.map(file => file.path);
    if (!documentPaths.length) throw new ApiErrors(400, "No documents provided");

    const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
        { $set: { documents: documentPaths } },
        { new: true }
    );

    if (!vendor) throw new ApiErrors(404, "Vendor not found");

    await Notification.create({
        message: `Vendor ${vendor.name} has uploaded documents for verification`
    });

    res.status(200).json(new ApiResponse(200, "Documents uploaded successfully", vendor));
});

// 🔹 Get Upcoming Bookings for Vendor
export const getUpcomingBookings = asyncHandler(async (req, res) => {
    const { vendorId } = req.body;
    if (!vendorId) throw new ApiErrors(400, "Vendor ID is required");

    const bookings = await Booking.find({
        vendorId,
        status: { $in: ['pending', 'confirmed'] },
        date: { $gte: new Date() }
    }).populate('userId', 'name phone address city');

    if (!bookings.length) throw new ApiErrors(404, "No upcoming bookings found");

    res.status(200).json(new ApiResponse(200, "Upcoming bookings fetched successfully", bookings));
});

// 🔹 Respond to Booking Request (Accept/Reject)
export const respondToBookingRequest = asyncHandler(async (req, res) => {
    const { vendorId, response } = req.body;
    const { bookingId } = req.params;

    if (!vendorId || !bookingId || !response) throw new ApiErrors(400, "Missing required fields");

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiErrors(404, "Booking not found");

    if (booking.vendorId.toString() !== vendorId) throw new ApiErrors(403, "Unauthorized");

    if (!["ACCEPTED", "REJECTED"].includes(response)) {
        throw new ApiErrors(400, "Invalid response");
    }

    booking.status = response;
    await booking.save();

    res.status(200).json(new ApiResponse(200, "Booking status updated successfully", booking));
});

// 🔹 Start Timer for Work
export const startTimer = asyncHandler(async (req, res) => {
    const {  vendorId } = req.body;
    const { bookingId } = req.params;

    if (!vendorId || !bookingId) throw new ApiErrors(400, "Missing required fields");

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiErrors(404, "Booking not found");

    if (booking.vendorId.toString() !== vendorId) throw new ApiErrors(403, "Unauthorized");

    booking.workStartTime = new Date();
    await booking.save();

    res.status(200).json(new ApiResponse(200, "Timer started successfully", booking));
});

// 🔹 Stop Timer & Calculate Charges
export const stopTimer = asyncHandler(async (req, res) => {
    const {  vendorId } = req.body;
    const { bookingId } = req.params;
    if (!vendorId || !bookingId) throw new ApiErrors(400, "Missing required fields");

    const booking = await Booking.findById(bookingId);
    if (!booking || !booking.workStartTime) throw new ApiErrors(404, "Booking not found or work not started");

    booking.workEndTime = new Date();
    const durationMs = booking.workEndTime - booking.workStartTime;
    const durationHours = durationMs / (1000 * 60 * 60);

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) throw new ApiErrors(404, "Vendor not found");

    booking.charge = Math.max(vendor.chargePerHour, vendor.chargePerHour * durationHours);
    booking.status = "completed";
    await booking.save();

    res.status(200).json(new ApiResponse(200, "Timer stopped successfully", booking));
});

// 🔹 Complete Booking & Handle Payment
export const completeBooking = asyncHandler(async (req, res) => {
    const {  vendorId, paymentMethod, transactionId } = req.body;
    const { bookingId } = req.params;

    if (!vendorId || !bookingId || !paymentMethod) throw new ApiErrors(400, "Missing required fields");

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiErrors(404, "Booking not found");

    booking.status = "completed";
    booking.paymentMethod = paymentMethod;
    if (transactionId) booking.transactionId = transactionId;
    await booking.save();

    await Notification.create({
        userId: booking.userId,
        message: `Your booking for ${booking.serviceType} has been completed. Payment received.`,
        status: "unread"
    });

    res.status(200).json(new ApiResponse(200, "Booking completed successfully", booking));
});

// 🔹 Fetch Vendor Stats
export const statsController = asyncHandler(async (req, res) => {
    const { vendorId } = req.body;
    if (!vendorId) throw new ApiErrors(400, "Vendor ID is required");

    const completedBookings = await Booking.find({ vendorId, status: "completed" });
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.charge, 0);

    const totalWorkHours = completedBookings.reduce((sum, booking) => {
        if (booking.workStartTime && booking.workEndTime) {
            return sum + (booking.workEndTime - booking.workStartTime) / (1000 * 60 * 60);
        }
        return sum;
    }, 0);

    res.status(200).json(new ApiResponse(200, { totalRevenue, totalWorkHours }, "Stats fetched successfully"));
});
