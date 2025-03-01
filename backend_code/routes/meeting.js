const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
// const twilio = require("twilio");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const WHEREBY_API_KEY = process.env.WHEREBY_API_KEY;
const WHEREBY_API_URL = "https://api.whereby.dev/v1/meetings";

// Email & SMS Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshbhanushali7705@gmail.com",
    pass: "hqrj exws zfkv bslp",
  },
});

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

let meetings = {}; // Store meeting details

// 📌 API to Create a Meeting & Send Notifications
router.post("/create-meeting", async (req, res) => {
  console.log('Using Whereby API Key:', WHEREBY_API_KEY);
  try {
    const { patientEmail, patientPhone, patientName, date, time  } = req.body; // Get patient details

    if (!patientEmail || !patientPhone) {
      return res
        .status(400)
        .json({ error: "Patient email and phone are required" });
    }

    const meetingId = uuidv4();
    const response = await axios.post(
      WHEREBY_API_URL,
      {
        endDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Meeting duration: 1 hour
        isLocked: false,      
        startDate: new Date(Date.now()).toISOString()
      },
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzQwNzQ3NjU2LCJvcmdhbml6YXRpb25JZCI6MzExNzYwLCJqdGkiOiIyYThjYmE3Ny0zMWU4LTQzMzktOTIwMy0zNDJmNThkODliNWUifQ.q2V_gd-u76ZoXHRhJU1VtDXeL8WN0sBL5ArtiA-15X0"}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(WHEREBY_API_KEY)
    // console.log(response);

    const meetingLink = response.data.roomUrl;
    meetings[meetingId] = { meetingLink, createdAt: new Date() };

    // 📧 Send Email Notification
    const mailOptions = {
      from: "harshbhanushali7705@gmail.com",
      to: "dhruvprajapati66572@gmail.com",
      subject: "Doctor's Appointment Meeting Link",
      text: `Your doctor's appointment has been scheduled.\n\nMeeting Link: ${meetingLink}\n\nJoin using this link at the scheduled time.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // 📱 Send SMS Notification
    // twilioClient.messages
    //     .create({
    //         body: `Your doctor's appointment is scheduled. Join using this link: ${meetingLink}`,
    //         from: process.env.TWILIO_PHONE,
    //         to: patientPhone,
    //     })
    //     .then((message) => console.log("SMS sent:", message.sid))
    //     .catch((error) => console.error("Error sending SMS:", error));

    res.json({ meetingId, meetingLink });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({
      error: "An error occurred while creating the meeting",
      message: error.message,
    });
  }
});

// 📌 API to Get Meeting Details
router.get("/meeting/:id", (req, res) => {
  const meeting = meetings[req.params.id];
  if (!meeting) {
    return res.status(404).json({ error: "Meeting not found" });
  }
  res.json({ meetingLink: meeting.meetingLink });
});

module.exports = router;
