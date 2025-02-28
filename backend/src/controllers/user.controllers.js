import { User } from "../models/user.models.js";
import { Notification } from "../models/notification.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";   
import { ApiErrors } from "../utils/apiError.utils.js";
import { Booking } from "../models/booking.models.js";
import { Vendor } from "../models/vendor.models.js";



// Profile setup
export const setupProfile = asyncHandler(async (req, res) => {
    const { userId, phone, address, city } = req.body;

    if (!userId || !phone || !address || !city) {
        throw new ApiErrors(400, "All fields are required");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { phone, address, city },
        { new: true }
    );

    if (!updatedUser) {
        throw new ApiErrors(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "Profile setup completed"));
});

// Get profile
export const getProfile = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiErrors(400, "User ID is required");
    }

    const user = await User.findById(userId).select("-__v");

    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

// Edit profile
export const editProfile = asyncHandler(async (req, res) => {
    const { userId, phone, address, city } = req.body;

    if (!userId) {
        throw new ApiErrors(400, "User ID is required");
    }

    const updateData = {};
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;

    if (Object.keys(updateData).length === 0) {
        throw new ApiErrors(400, "At least one field (phone, address, or city) must be updated");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
        throw new ApiErrors(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

// Get all vendors
export const getAllVendors = asyncHandler(async (req, res) => {
    const { jobType, city, rating, language } = req.query;

    let filter = { role: "vendor", verified: true };

    if (jobType) filter.jobType = jobType;
    if (city) filter.city = city;
    if (rating) filter.rating = { $gte: rating };
    if (language) filter.language = language;

    const vendors = await Vendor.find(filter);

    if (!vendors.length) {
        throw new ApiErrors(404, "No vendors found.");
    }

    res.status(200).json(new ApiResponse(200, vendors, "List of vendors"));
});

// Get vendor details
export const getVendorDetails = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    if (!vendorId) {
        throw new ApiErrors(400, "Vendor ID is required");
    }

    const vendor = await Vendor.findById(vendorId).select("-password");

    if (!vendor) {
        throw new ApiErrors(404, "Vendor not found");
    }

    res.status(200).json(new ApiResponse(200, vendor, "Vendor details fetched successfully"));
});

// Book a vendor (Now or Later)
export const bookVendor = asyncHandler(async (req, res) => {
    const { userId, vendorId, serviceDate, serviceTime, workDescription, bookNow } = req.body;

    if (!userId || !vendorId || !serviceDate || !serviceTime) {
        throw new ApiErrors(400, "Missing required fields");
    }

    const today = moment().format("YYYY-MM-DD");
    const selectedDate = moment(serviceDate, "YYYY-MM-DD").format("YYYY-MM-DD");

    if (selectedDate === today && !bookNow) {
        throw new ApiErrors(400, "Same-day bookings must select 'Book Now' with extra charges");
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        throw new ApiErrors(404, "Vendor not found");
    }

    let totalPrice = vendor.chargePerHour;

    if (bookNow) {
        totalPrice += 40; // Extra charge for same-day booking
    }

    const newBooking = await Booking.create({
        userId,
        vendorId,
        serviceDate,
        serviceTime,
        workDescription,
        bookNow,
        totalPrice,
        status: "pending"
    });

    // Send booking notification to user
    await Notification.create({
        userId,
        bookingId: newBooking._id,
        message: `Your booking for ${vendor.name} on ${serviceDate} at ${serviceTime} is pending confirmation.`,
        type: "booking",
        bookingStatus: "PENDING",
        createdAt: new Date()
    });

    // Send booking notification to vendor
    await Notification.create({
        userId: vendor.userId,
        bookingId: newBooking._id,
        message: `You have received a new booking request from a user for ${serviceDate} at ${serviceTime}.`,
        type: "booking",
        status: "unread",
        bookingStatus: "PENDING",
        createdAt: new Date()
    });

    res.status(201).json(new ApiResponse(201, newBooking, "Booking request sent to vendor"));
});

// Get all notifications for a user
export const getNotifications = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiErrors(400, "User ID is required");
    }

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, notifications, "User notifications fetched successfully"));
});

// Get user bookings
export const getMyBookings = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiErrors(400, "User ID is required");
    }

    const bookings = await Booking.find({ userId }).populate("vendorId", "name phone charge");

    res.status(200).json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
});










