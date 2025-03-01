// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Import models
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set the destination where files will be saved
    cb(null, 'uploads/doctor-profiles/');
  },
  filename: function(req, file, cb) {
    // Create unique filenames to prevent overwriting
    const uniqueFilename = `doctor-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// Set up upload restrictions
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function(req, file, cb) {
    // Only accept image files
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    // Check the file extension
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check the MIME type
    const mimetype = allowedFileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
    }
  }
});

// Patient Signup
router.post('/patient/signup', async (req, res) => {
  const { fullName, email, mobile, password } = req.body;
  
  // Validate required fields
  if (!fullName || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    // Check if email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({ 
      fullName, 
      email, 
      mobile, 
      password: hashedPassword 
    });
    
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Patient Login
router.post('/patient/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Return patient data without JWT
    res.status(200).json({ 
      message: 'Login successful', 
      patient: {
        id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
        mobile: patient.mobile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Doctor Signup
router.post('/doctor/signup', upload.single('image'), async (req, res) => {
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
      department 
    } = req.body;

    // Validate required fields
    if (!fullName || !username || !email || !mobile || !licenseNumber || 
        !specialty || !experience || !password || !department) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const existingDoctor = await Doctor.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingDoctor) {
      return res.status(400).json({ 
        message: existingDoctor.username === username 
          ? 'Username already taken' 
          : 'Email already registered' 
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
      profileImage: req.file ? `/uploads/doctor-profiles/${req.file.filename}` : null
    });

    await newDoctor.save();
    res.status(201).json({ 
      success: true,
      message: 'Doctor registered successfully',
      doctorId: newDoctor._id,
      doctor: { fullName, email, mobile, specialty } // Return doctor data without a token
    });
  } catch (error) {
    console.error('Doctor signup error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Doctor Login
router.post('/doctor/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Return the doctor data without a token
    res.status(200).json({ 
      message: 'Login successful', 
      doctor: { 
        id: doctor._id, 
        name: doctor.fullName, 
        specialty: doctor.specialty,
        email: doctor.email,
        mobile: doctor.mobile,
        department: doctor.department,
        profileImage: doctor.profileImage
      }
    });
  } catch (error) {
    console.error('Doctor login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Test route
router.get('/auth-test', (req, res) => {
  res.json({ message: 'Auth routes are working' });
});






module.exports = router;
