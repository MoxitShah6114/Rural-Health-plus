// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const path = require('path');
// const authRoutes = require('./routes/auth');
// // const Doctor = require('../models/Doctor');
// // In server.js
// const Doctor = require('./models/Doctor'); // Adjusted path to point correctly
// // Add these imports at the top of server.js
// const meetingRoutes = require('./routes/meeting');
// const pdfRoutes = require('./routes/generate_pdf');



// const router = express.Router();
// // const authMiddleware = require('../middleware/auth'); // Assume you have an auth middleware to verify tokens


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Create upload directories if they don't exist
// const uploadDir = path.join(__dirname, 'uploads/doctor-profiles');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // Routes
// app.use('/api', authRoutes);
// app.use('/meeting', meetingRoutes);
// app.use('/', pdfRoutes);
// // app.use('/api', authRoutes);

// // Basic route for testing
// // app.get('/', (req, res) => {
// //   res.send('API is running');
// // });




// // Get Doctor Profile
// // router.get('/doctor/profile', authMiddleware, async (req, res) => {
// //   try {
// //     const doctorId = req.user.id; // Assuming the ID is set on req.user from the auth middleware
// //     const doctor = await Doctor.findById(doctorId).select('-password'); // Exclude password from response
    
// //     if (!doctor) {
// //       return res.status(404).json({ message: 'Doctor not found' });
// //     }
    
// //     return res.status(200).json({ 
// //       success: true,
// //       doctor: {
// //         id: doctor._id,
// //         fullName: doctor.fullName,
// //         email: doctor.email,
// //         mobile: doctor.mobile,
// //         specialty: doctor.specialty,
// //         department: doctor.department,
// //         profileImage: doctor.profileImage,
// //       }
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching doctor profile:', error);
// //     return res.status(500).json({ message: 'Server error' });
// //   }
// // });













// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// // chatbot api
// // server.js// server.js














// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const path = require('path');
// const authRoutes = require('./routes/auth');
// const meetingRoutes = require('./routes/meeting');
// const pdfRoutes = require('./routes/generate_pfd');
// const Doctor = require('./models/Doctor');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Create upload directories if they don't exist
// const uploadDir = path.join(__dirname, 'uploads/doctor-profiles');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files from the prescriptions directory
// app.use('/prescriptions', express.static(path.join(__dirname, 'prescriptions')));



// // Import routes
// const generatePdfRouter = require('./routes/generate_pfd');

// // Use routes
// app.use('/', generatePdfRouter);








// // Start server

// // In server.js


// // Make sure CORS is properly configured


// // Ensure the routes are properly set up
// // app.use('/meeting', meetingRoutes);





// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Create and serve prescriptions directory
// const prescriptionsDir = path.join(__dirname, 'prescriptions');
// if (!fs.existsSync(prescriptionsDir)) {
//   fs.mkdirSync(prescriptionsDir, { recursive: true });
// }
// // app.use('/prescriptions', express.static(prescriptionsDir));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// app.use(cors({
//   origin: '*', // For development only
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// // Routes
// app.use('/api', authRoutes);
// app.use('/meeting', meetingRoutes);
// app.use('/', pdfRoutes);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', message: 'Server is running' });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// // Add this to your server.js file
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

// // Add a global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({ 
//     success: false,
//     error: 'Server error', 
//     message: err.message 
//   });
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const path = require('path');
// const authRoutes = require('./routes/auth');
// const meetingRoutes = require('./routes/meeting');
// const Doctor = require('./models/Doctor');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Create directories if they don't exist
// const uploadDir = path.join(__dirname, 'uploads/doctor-profiles');
// const prescriptionsDir = path.join(__dirname, 'prescriptions');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// if (!fs.existsSync(prescriptionsDir)) {
//   fs.mkdirSync(prescriptionsDir, { recursive: true });
// }

// // Middleware
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/prescriptions', express.static(path.join(__dirname, 'prescriptions')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// // Import routes
// const authRouter = require('./routes/auth');
// const meetingRouter = require('./routes/meeting');
// const pdfRouter = require('./routes/generate_pfd');

// // Use routes
// app.use('/api', authRouter);
// app.use('/meeting', meetingRouter);
// app.use('/api/pdf', pdfRouter);

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', message: 'Server is running' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({ 
//     success: false,
//     error: 'Server error', 
//     message: err.message 
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
// import { fetchPendingDoctors, approveDoctor, rejectDoctor } from './api';

// import { fetchPendingDoctors, approveDoctor, rejectDoctor } from './api';

// In your server.js file
// app.use('/api/doctors', require('./routes/doctorRoutes'));


// Enable better error handling for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process to allow the server to continue running
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process immediately
  console.error('Server will continue running, but may be in an unstable state');
});

// Load environment variables
try {
  dotenv.config();
  console.log('Environment variables loaded');
} catch (error) {
  console.error('Error loading environment variables:', error);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting server initialization...');

// Create necessary directories
try {
  const uploadDir = path.join(__dirname, 'uploads/doctor-profiles');
  const prescriptionsDir = path.join(__dirname, 'prescriptions');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Created uploads directory');
  }

  if (!fs.existsSync(prescriptionsDir)) {
    fs.mkdirSync(prescriptionsDir, { recursive: true });
    console.log('Created prescriptions directory');
  }
} catch (error) {
  console.error('Error creating directories:', error);
}

// Configure middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/prescriptions', express.static(path.join(__dirname, 'prescriptions')));

app.use('/api', authRoutes);
app.use('/api/doctors', doctorRoutes);

console.log('Middleware configured');

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Rural Health+ API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB (with fallback for testing)
let dbConnected = false;

try {
  if (process.env.MONGO_URI) {
    console.log('Attempting to connect to MongoDB...');
    
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected successfully');
      dbConnected = true;
      setupRoutes(); // Only set up routes after DB connection
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      setupRoutes(); // Set up routes even if DB connection fails
    });
  } else {
    console.warn('MONGO_URI not found in environment variables. Skipping database connection.');
    setupRoutes(); // Set up routes without DB connection
  }
} catch (error) {
  console.error('Error during MongoDB connection setup:', error);
  setupRoutes(); // Set up routes despite errors
}

// Function to set up routes
function setupRoutes() {
  console.log('Setting up routes...');
  
  try {
    // Create a simple router for testing
    const testRouter = express.Router();
    testRouter.get('/', (req, res) => res.json({ message: 'Test route working' }));
    app.use('/test', testRouter);
    
    // Try to import route modules
    let authRoutes, meetingRoutes, pdfRouter;
    
    try {
      authRoutes = require('./routes/auth');
      console.log('Auth routes loaded');
      app.use('/api', authRoutes);
    } catch (error) {
      console.error('Error loading auth routes:', error);
      // Create a fallback router
      const fallbackRouter = express.Router();
      fallbackRouter.all('*', (req, res) => res.status(503).json({ error: 'Auth service unavailable' }));
      app.use('/api', fallbackRouter);
    }
    
    try {
      meetingRoutes = require('./routes/meeting');
      console.log('Meeting routes loaded');
      app.use('/meeting', meetingRoutes);
    } catch (error) {
      console.error('Error loading meeting routes:', error);
      // Create a fallback router
      const fallbackRouter = express.Router();
      fallbackRouter.all('*', (req, res) => res.status(503).json({ error: 'Meeting service unavailable' }));
      app.use('/meeting', fallbackRouter);
    }
    
    try {
      pdfRouter = require('./routes/generate_pfd');
      console.log('PDF routes loaded');
      app.use('/api/pdf', pdfRouter);
    } catch (error) {
      console.error('Error loading PDF routes:', error);
      // Create a fallback router
      const fallbackRouter = express.Router();
      fallbackRouter.all('*', (req, res) => res.status(503).json({ error: 'PDF service unavailable' }));
      app.use('/api/pdf', fallbackRouter);
    }
    
    console.log('Routes setup completed');
  } catch (error) {
    console.error('Error setting up routes:', error);
  }

  // Global error handler - must be last
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error', 
      message: err.message 
    });
  });

  // Start the server
  startServer();
}

// Function to start the server
function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log(`Database connection: ${dbConnected ? 'Connected' : 'Not connected'}`);
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
    
    // Keep the process running
    process.stdin.resume();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down server gracefully...');
      server.close(() => {
        console.log('Server shut down successfully');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

