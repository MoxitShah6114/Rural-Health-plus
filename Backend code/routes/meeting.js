// const { v4: uuidv4 } = require("uuid");
// const axios = require("axios");
// // const twilio = require("twilio");
// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();

// const WHEREBY_API_KEY = process.env.WHEREBY_API_KEY;
// const WHEREBY_API_URL = "https://api.whereby.dev/v1/meetings";

// // Email & SMS Configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "harshbhanushali7705@gmail.com",
//     pass: "hqrj exws zfkv bslp",
//   },
// });

// // const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// let meetings = {}; // Store meeting details

// // 📌 API to Create a Meeting & Send Notifications
// router.post("/create-meeting", async (req, res) => {
//   console.log('Using Whereby API Key:', WHEREBY_API_KEY);
//   try {
//     const { patientEmail, patientPhone, patientName, date, time  } = req.body; // Get patient details

//     if (!patientEmail || !patientPhone) {
//       return res
//         .status(400)
//         .json({ error: "Patient email and phone are required" });
//     }

//     const meetingId = uuidv4();
//     // const response = await axios.post(
//     //   WHEREBY_API_URL,
//     //   {
//     //     endDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Meeting duration: 1 hour
//     //     isLocked: false,      
//     //     startDate: new Date(Date.now()).toISOString()
//     //   },
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzQwNzQ3NjU2LCJvcmdhbml6YXRpb25JZCI6MzExNzYwLCJqdGkiOiIyYThjYmE3Ny0zMWU4LTQzMzktOTIwMy0zNDJmNThkODliNWUifQ.q2V_gd-u76ZoXHRhJU1VtDXeL8WN0sBL5ArtiA-15X0"}`,
//     //       "Content-Type": "application/json",
//     //     },
//     //   }
//     // );

//     // In meeting.js, modify the API call to use the environment variable consistently
// const response = await axios.post(
//   WHEREBY_API_URL,
//   {
//     endDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
//     isLocked: false,      
//     startDate: new Date(Date.now()).toISOString()
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${WHEREBY_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//   }
// );

//     console.log(WHEREBY_API_KEY)
//     // console.log(response);

//     const meetingLink = response.data.roomUrl;
//     meetings[meetingId] = { meetingLink, createdAt: new Date() };

//     // 📧 Send Email Notification
//     const mailOptions = {
//       from: "harshbhanushali7705@gmail.com",
//       to: "dhruvprajapati66572@gmail.com",
//       subject: "Doctor's Appointment Meeting Link",
//       text: `Your doctor's appointment has been scheduled.\n\nMeeting Link: ${meetingLink}\n\nJoin using this link at the scheduled time.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });

//     // 📱 Send SMS Notification
//     // twilioClient.messages
//     //     .create({
//     //         body: `Your doctor's appointment is scheduled. Join using this link: ${meetingLink}`,
//     //         from: process.env.TWILIO_PHONE,
//     //         to: patientPhone,
//     //     })
//     //     .then((message) => console.log("SMS sent:", message.sid))
//     //     .catch((error) => console.error("Error sending SMS:", error));

//     res.json({ meetingId, meetingLink });
//   } catch (error) {
//     console.error("Error creating meeting:", error);
//     res.status(500).json({
//       error: "An error occurred while creating the meeting",
//       message: error.message,
//     });
//   }
// });

// // 📌 API to Get Meeting Details
// router.get("/meeting/:id", (req, res) => {
//   const meeting = meetings[req.params.id];
//   if (!meeting) {
//     return res.status(404).json({ error: "Meeting not found" });
//   }
//   res.json({ meetingLink: meeting.meetingLink });
// });

// module.exports = router;











const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// Email Configuration - use environment variables when possible
const EMAIL_USER = "harshbhanushali7705@gmail.com";
const EMAIL_PASS = "hqrj exws zfkv bslp";

// Initialize email transporter
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
} catch (error) {
  console.error("Failed to initialize email transporter:", error);
}

// In-memory storage for meetings (use a database in production)
const meetings = {};

// API to Create a Meeting & Send Notifications
router.post("/create-meeting", async (req, res) => {
  console.log("Meeting request received:", req.body);
  
  try {
    const { patientEmail, patientPhone, patientName, date, time } = req.body;

    // Basic validation
    if (!patientName) {
      return res.status(400).json({
        success: false,
        error: "Patient name is required"
      });
    }

    // Generate a meeting ID and link
    const meetingId = uuidv4();
    // For simplicity, we're just generating a fake meeting link
    // In production, you would integrate with a real video service API
    const meetingLink = `https://meet.yourdomain.com/${meetingId}`;

    // Store meeting details
    meetings[meetingId] = {
      meetingLink,
      patientName,
      patientEmail,
      patientPhone,
      date,
      time,
      createdAt: new Date()
    };

    console.log(`Meeting created with ID: ${meetingId}`);
    console.log(`Meeting link: ${meetingLink}`);

    // Send email notification if email is provided and transporter is initialized
    if (patientEmail && transporter) {
      try {
        const mailOptions = {
          from: EMAIL_USER,
          to: patientEmail,
          subject: "Doctor's Appointment Meeting Link",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h2 style="color: #2563eb;">Your Doctor's Appointment</h2>
              <p>Hello ${patientName},</p>
              <p>Your doctor's appointment has been scheduled for ${date} at ${time}.</p>
              <p>Please join the video consultation using the link below:</p>
              <p style="margin: 20px 0;">
                <a href="${meetingLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Join Video Consultation
                </a>
              </p>
              <p>Or copy this link: <span style="color: #2563eb;">${meetingLink}</span></p>
              <p>Please join 5 minutes before your scheduled time.</p>
              <p>Thank you,<br>Your Healthcare Team</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", patientEmail);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue even if email fails
      }
    } else if (patientEmail) {
      console.log("Email not sent: Transporter not initialized");
    }

    // Return success response with the meeting link
    return res.status(200).json({
      success: true,
      meetingId,
      meetingLink,
      message: "Meeting created successfully"
    });

  } catch (error) {
    console.error("Server error in create-meeting:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
});

// API to Get Meeting Details
router.get("/meeting/:id", (req, res) => {
  try {
    const meetingId = req.params.id;
    const meeting = meetings[meetingId];
    
    if (!meeting) {
      return res.status(404).json({
        success: false,
        error: "Meeting not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      meetingLink: meeting.meetingLink,
      patientName: meeting.patientName,
      date: meeting.date,
      time: meeting.time
    });
  } catch (error) {
    console.error("Server error in get-meeting:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message
    });
  }
});

module.exports = router;
