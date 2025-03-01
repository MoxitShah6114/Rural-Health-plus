const Doctor = require("../models/Doctor");
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require('path');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination where files will be saved
    cb(null, "uploads/doctor-profiles/");
  },
  filename: function (req, file, cb) {
    // Create unique filenames to prevent overwriting
    const uniqueFilename = `doctor-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFilename);
  },
});

// Set up upload restrictions
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Only accept image files
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    // Check the file extension
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check the MIME type
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed!"));
    }
  },
});

router.get('/s',(req,res)=>{
    res.json({ message: 'Auth routes are working' });
})

// Doctor Signup
router.post("/doctor/signup", upload.single("image"), async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      mobile,
      licenseNumber,
      specialty,
      experience,
      password,
      biography,
      department,

    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !username ||
      !email ||
      !mobile ||
      !licenseNumber ||
      !specialty ||
      !experience ||
      !password ||
      !department
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const existingDoctor = await Doctor.findOne({
      $or: [{ username }, { email }],
    });

    if (existingDoctor) {
      return res.status(400).json({
        message:
          existingDoctor.username === username
            ? "Username already taken"
            : "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      fullName,
      username,
      email,
      mobile,
      licenseNumber,
      specialty,
      experience,
      password: hashedPassword,
      biography,
      department,
      profileImage: req.file
        ? `/uploads/doctor-profiles/${req.file.filename}`
        : null,
      status: "pending",
    });

    await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctorId: newDoctor._id,
      doctor: { fullName, email, mobile, specialty }, // Return doctor data without a token
    });
  } catch (error) {
    console.error("Doctor signup error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Doctor Login
router.post("/doctor/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if(doctor.status == "pending"){
        return res.status(400).json({message : "Admin Not Approve Your account"})
    }
    // Return the doctor data without a token
    res.status(200).json({
      message: "Login successful",
      doctor: doctor,
    });
  } catch (error) {
    console.error("Doctor login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get Pending Doctors
router.get("/pending", async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: "pending" });
    res.json(pendingDoctors);
  } catch (error) {
    console.error("Error fetching pending doctors:", error);
    res.status(500).json({ message: "Error fetching pending doctors." });
  }
});

// Approve Doctor
router.patch("/:id/approve", async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, { status: "active" });
    res.status(200).json({ message: "Doctor approved." });
  } catch (error) {
    console.error("Error approving doctor:", error);
    res.status(500).json({ message: "Error approving doctor." });
  }
});

// Reject Doctor
router.delete("/:id/reject", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor rejected." });
  } catch (error) {
    console.error("Error rejecting doctor:", error);
    res.status(500).json({ message: "Error rejecting doctor." });
  }
});

module.exports = router;
