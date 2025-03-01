import mongoose from "mongoose";

const languages = [
  "English", "Hindi", "Marathi", "Konkani",];

const VendorSchema = new mongoose.Schema({

    name: { type: String, required: true },
    password: { type: String, required: true },

    phone: { type: String, required: true },
    photo: { type: String }, // URL of profile photo
    city: { type: String, required: false },
    language: { type: [String], enum: languages }, // Change from String to [String]
    serviceType: { type: String, required: false }, // e.g., plumber, electrician
    experience: { type: Number, required: false }, // In years
    workDescription: { type: String },
    chargePerHour: { type: Number, required: false },
    documents: { 
      aadhar: { type: String, required: false },  // Aadhar card link
      pan: { type: String, required: false }     // PAN card link (optional)
    }, 
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    isAvailable: { type: Boolean, default: false }, // Online/offline toggle
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    completedBookings: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    totalWorkHours: {
      type: Number,
      default: 0
    },


    createdAt: { type: Date, default: Date.now }
  });
export const Vendor = mongoose.model("Vendor", VendorSchema);