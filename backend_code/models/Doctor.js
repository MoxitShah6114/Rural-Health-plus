// models/Doctor.js
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  password: { type: String, required: true },
  biography: { type: String },
  department: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending",
  }, // Add status field
  profileImage: {
    type: String,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
