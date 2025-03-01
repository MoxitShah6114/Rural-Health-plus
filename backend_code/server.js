const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctorRoutes.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create upload directories if they don't exist
const uploadDir = path.join(__dirname, 'uploads/doctor-profiles');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api', authRoutes);
app.use('/api/doctors', doctorRoutes);
// app.use('/api', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});


// Get Doctor Profile
// router.get('/doctor/profile', authMiddleware, async (req, res) => {
//   try {
//     const doctorId = req.user.id; // Assuming the ID is set on req.user from the auth middleware
//     const doctor = await Doctor.findById(doctorId).select('-password'); // Exclude password from response
    
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
    
//     return res.status(200).json({ 
//       success: true,
//       doctor: {
//         id: doctor._id,
//         fullName: doctor.fullName,
//         email: doctor.email,
//         mobile: doctor.mobile,
//         specialty: doctor.specialty,
//         department: doctor.department,
//         profileImage: doctor.profileImage,
//       }
//     });
    
//   } catch (error) {
//     console.error('Error fetching doctor profile:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });













// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});