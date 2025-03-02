// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const PDFDocument = require("pdfkit");

// router.post("/generate-pdf", async (req, res) => {
//     try {
//         const { patientName, age, email, medicines, diagnosis, doctorName, date } = req.body;
  
//         const pdfDoc = new PDFDocument();
//         const pdfPath = `./prescriptions/${patientName}_${Date.now()}.pdf`;
  
//         if (!fs.existsSync("./prescriptions")) {
//             fs.mkdirSync("./prescriptions");
//         }
  
//         const pdfStream = fs.createWriteStream(pdfPath);
//         pdfDoc.pipe(pdfStream);
  
//         // Header
//         pdfDoc.fontSize(20).text("Medical Prescription", { align: "center" }).moveDown();
        
//         // Patient Info
//         pdfDoc.fontSize(14).text(`Patient Name: ${patientName}`);
//         pdfDoc.text(`Age: ${age}`);
//         pdfDoc.text(`Diagnosis: ${diagnosis}`);
//         pdfDoc.text(`Date: ${date}`);
//         pdfDoc.moveDown();
  
//         // Medicines
//         pdfDoc.text("Prescribed Medicines:", { underline: true });
//         medicines.forEach((med, index) => {
//             pdfDoc.text(`${index + 1}. ${med.name} - ${med.dosage}`);
//         });
  
//         pdfDoc.moveDown();
//         pdfDoc.text(`Doctor: ${doctorName}`);
  
//         pdfDoc.end();
  
//         pdfStream.on("finish", async () => {
//             // Send PDF via Email
//             await sendEmail(email, pdfPath);
//             res.json({ message: "PDF Generated & Sent!", pdfUrl: pdfPath });
//         });
  
//     } catch (error) {
//         res.status(500).json({ error: "Failed to generate PDF" });
//     }
//   });
  
//   // Function to Send Email
//   async function sendEmail(toEmail, attachmentPath) {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });
  
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: "harshbhanushali7705@gmail.com",
//         subject: "Your Medical Prescription",
//         text: "Attached is your medical prescription.",
//         attachments: [{ filename: "prescription.pdf", path: attachmentPath }],
//     };
  
//     await transporter.sendMail(mailOptions);
//   }

// module.exports = router;



















// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const PDFDocument = require("pdfkit");

// // Load environment variables
// const EMAIL_USER = process.env.EMAIL_USER || "harshbhanushali7705@gmail.com";
// const EMAIL_PASS = process.env.EMAIL_PASS || "hqrj exws zfkv bslp";

// // Create prescriptions directory if it doesn't exist
// const prescriptionsDir = path.join(__dirname, '../prescriptions');
// if (!fs.existsSync(prescriptionsDir)) {
//   fs.mkdirSync(prescriptionsDir, { recursive: true });
// }

// // Helper function to validate email
// const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// router.post("/generate-pdf", async (req, res) => {
//   try {
//     const { patientName, age, email, medicines, diagnosis, doctorName, date } = req.body;
    
//     // Validate required fields
//     if (!patientName || !doctorName) {
//       return res.status(400).json({ error: "Patient name and doctor name are required" });
//     }
    
//     // Validate email if provided
//     if (email && !isValidEmail(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }
    
//     // Validate medicines array
//     if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
//       return res.status(400).json({ error: "At least one medicine is required" });
//     }

//     // Create a unique filename
//     const timestamp = Date.now();
//     const sanitizedPatientName = patientName.replace(/[^a-zA-Z0-9]/g, '_');
//     const pdfFilename = `${sanitizedPatientName}_${timestamp}.pdf`;
//     const pdfPath = path.join(prescriptionsDir, pdfFilename);
  
//     // Create PDF document
//     const pdfDoc = new PDFDocument({
//       size: 'A4',
//       margins: { top: 50, bottom: 50, left: 50, right: 50 }
//     });
    
//     const pdfStream = fs.createWriteStream(pdfPath);
//     pdfDoc.pipe(pdfStream);
  
//     // Add hospital/clinic logo or header
//     pdfDoc.fontSize(24)
//           .font('Helvetica-Bold')
//           .fillColor('#2563eb')
//           .text("Medical Prescription", { align: "center" })
//           .moveDown(0.5);
    
//     // Add horizontal line
//     pdfDoc.moveTo(50, pdfDoc.y)
//           .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
//           .stroke('#2563eb')
//           .moveDown(0.5);
    
//     // Current date
//     const currentDate = date || new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
    
//     pdfDoc.fontSize(10)
//           .font('Helvetica')
//           .fillColor('#64748b')
//           .text(`Date: ${currentDate}`, { align: 'right' })
//           .moveDown(1);
        
//     // Patient Info section
//     pdfDoc.fontSize(12)
//           .font('Helvetica-Bold')
//           .fillColor('#1e293b')
//           .text('Patient Information:')
//           .moveDown(0.5);
    
//     pdfDoc.fontSize(11)
//           .font('Helvetica')
//           .text(`Name: ${patientName}`);
    
//     if (age) {
//       pdfDoc.text(`Age: ${age}`);
//     }
    
//     if (diagnosis) {
//       pdfDoc.moveDown(0.5)
//             .font('Helvetica-Bold')
//             .text('Diagnosis:')
//             .font('Helvetica')
//             .text(diagnosis);
//     }
    
//     pdfDoc.moveDown(1.5);
    
//     // Medicines section
//     pdfDoc.fontSize(12)
//           .font('Helvetica-Bold')
//           .text('Prescribed Medications:')
//           .moveDown(0.5);
    
//     medicines.forEach((med, index) => {
//       pdfDoc.fontSize(11)
//             .font('Helvetica-Bold')
//             .text(`${index + 1}. ${med.name} - ${med.dosage}`);
      
//       if (med.frequency) {
//         pdfDoc.fontSize(10)
//               .font('Helvetica')
//               .text(`   Frequency: ${med.frequency}`);
//       }
      
//       if (med.instructions) {
//         pdfDoc.fontSize(10)
//               .font('Helvetica')
//               .text(`   Instructions: ${med.instructions}`);
//       }
      
//       pdfDoc.moveDown(0.5);
//     });
    
//     // Footer with doctor information
//     pdfDoc.moveDown(2);
//     pdfDoc.fontSize(11)
//           .font('Helvetica-Bold')
//           .text(`Dr. ${doctorName}`, { align: 'right' });
    
//     // Add a signature line
//     pdfDoc.moveTo(pdfDoc.page.width - 200, pdfDoc.y + 20)
//           .lineTo(pdfDoc.page.width - 50, pdfDoc.y + 20)
//           .stroke();
    
//     pdfDoc.fontSize(10)
//           .font('Helvetica')
//           .text('Signature', { align: 'right' });
    
//     // Add disclaimer at the bottom
//     pdfDoc.moveDown(2);
//     pdfDoc.fontSize(8)
//           .font('Helvetica')
//           .fillColor('#94a3b8')
//           .text('This prescription is electronically generated and is valid without a physical signature.', { align: 'center' });
  
//     pdfDoc.end();
  
//     pdfStream.on("finish", async () => {
//       try {
//         // Send PDF via Email if email is provided
//         if (email) {
//           await sendEmail(email, pdfPath, patientName, doctorName);
//           console.log("Prescription email sent to:", email);
//         }
        
//         // Return success response
//         res.json({ 
//           success: true,
//           message: "Prescription generated successfully", 
//           pdfUrl: `/prescriptions/${pdfFilename}` 
//         });
//       } catch (emailError) {
//         console.error("Error sending prescription email:", emailError);
//         res.json({ 
//           success: true,
//           message: "Prescription generated but email sending failed", 
//           pdfUrl: `/prescriptions/${pdfFilename}`,
//           emailError: emailError.message
//         });
//       }
//     });
  
//   } catch (error) {
//     console.error("Failed to generate PDF:", error);
//     res.status(500).json({ 
//       error: "Failed to generate prescription", 
//       details: error.message 
//     });
//   }
// });


// const nodemailer = require("nodemailer");
// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const PDFDocument = require("pdfkit");

// // Load environment variables
// const EMAIL_USER = process.env.EMAIL_USER || "harshbhanushali7705@gmail.com";
// const EMAIL_PASS = process.env.EMAIL_PASS || "hqrj exws zfkv bslp";

// // Create prescriptions directory if it doesn't exist
// const prescriptionsDir = path.join(__dirname, '../prescriptions');
// if (!fs.existsSync(prescriptionsDir)) {
//   fs.mkdirSync(prescriptionsDir, { recursive: true });
// }

// // Helper function to validate email
// const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// // Email sending function
// async function sendEmail(recipientEmail, pdfPath, patientName, doctorName) {
//   // Create a transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: EMAIL_USER,
//       pass: EMAIL_PASS
//     }
//   });

//   // Email options
//   const mailOptions = {
//     from: EMAIL_USER,
//     to: recipientEmail,
//     subject: `Medical Prescription from Dr. ${doctorName}`,
//     text: `Dear ${patientName},\n\nPlease find attached your medical prescription from Dr. ${doctorName}.\n\nRegards,\nRural Health+ Team`,
//     attachments: [
//       {
//         filename: `Prescription_${patientName}.pdf`,
//         path: pdfPath,
//         contentType: 'application/pdf'
//       }
//     ]
//   };

//   // Send email
//   return transporter.sendMail(mailOptions);
// }

// router.post("/generate-pdf", async (req, res) => {
//   try {
//     const { patientName, age, email, medicines, diagnosis, doctorName, date } = req.body;
    
//     // Validate required fields
//     if (!patientName || !doctorName) {
//       return res.status(400).json({ error: "Patient name and doctor name are required" });
//     }
    
//     // Validate email if provided
//     if (email && !isValidEmail(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }
    
//     // Validate medicines array
//     if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
//       return res.status(400).json({ error: "At least one medicine is required" });
//     }

//     // Create a unique filename
//     const timestamp = Date.now();
//     const sanitizedPatientName = patientName.replace(/[^a-zA-Z0-9]/g, '_');
//     const pdfFilename = `${sanitizedPatientName}_${timestamp}.pdf`;
//     const pdfPath = path.join(prescriptionsDir, pdfFilename);
  
//     // Create PDF document
//     const pdfDoc = new PDFDocument({
//       size: 'A4',
//       margins: { top: 50, bottom: 50, left: 50, right: 50 }
//     });
    
//     const pdfStream = fs.createWriteStream(pdfPath);
//     pdfDoc.pipe(pdfStream);
  
//     // Add hospital/clinic logo or header
//     pdfDoc.fontSize(24)
//           .font('Helvetica-Bold')
//           .fillColor('#2563eb')
//           .text("Medical Prescription", { align: "center" })
//           .moveDown(0.5);
    
//     // Add horizontal line
//     pdfDoc.moveTo(50, pdfDoc.y)
//           .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
//           .stroke('#2563eb')
//           .moveDown(0.5);
    
//     // Current date
//     const currentDate = date || new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
    
//     pdfDoc.fontSize(10)
//           .font('Helvetica')
//           .fillColor('#64748b')
//           .text(`Date: ${currentDate}`, { align: 'right' })
//           .moveDown(1);
        
//     // Patient Info section
//     pdfDoc.fontSize(12)
//           .font('Helvetica-Bold')
//           .fillColor('#1e293b')
//           .text('Patient Information:')
//           .moveDown(0.5);
    
//     pdfDoc.fontSize(11)
//           .font('Helvetica')
//           .text(`Name: ${patientName}`);
    
//     if (age) {
//       pdfDoc.text(`Age: ${age}`);
//     }
    
//     if (diagnosis) {
//       pdfDoc.moveDown(0.5)
//             .font('Helvetica-Bold')
//             .text('Diagnosis:')
//             .font('Helvetica')
//             .text(diagnosis);
//     }
    
//     pdfDoc.moveDown(1.5);
    
//     // Medicines section
//     pdfDoc.fontSize(12)
//           .font('Helvetica-Bold')
//           .text('Prescribed Medications:')
//           .moveDown(0.5);
    
//     medicines.forEach((med, index) => {
//       pdfDoc.fontSize(11)
//             .font('Helvetica-Bold')
//             .text(`${index + 1}. ${med.name} - ${med.dosage}`);
      
//       if (med.frequency) {
//         pdfDoc.fontSize(10)
//               .font('Helvetica')
//               .text(`   Frequency: ${med.frequency}`);
//       }
      
//       if (med.instructions) {
//         pdfDoc.fontSize(10)
//               .font('Helvetica')
//               .text(`   Instructions: ${med.instructions}`);
//       }
      
//       pdfDoc.moveDown(0.5);
//     });
    
//     // Footer with doctor information
//     pdfDoc.moveDown(2);
//     pdfDoc.fontSize(11)
//           .font('Helvetica-Bold')
//           .text(`Dr. ${doctorName}`, { align: 'right' });
    
//     // Add a signature line
//     pdfDoc.moveTo(pdfDoc.page.width - 200, pdfDoc.y + 20)
//           .lineTo(pdfDoc.page.width - 50, pdfDoc.y + 20)
//           .stroke();
    
//     pdfDoc.fontSize(10)
//           .font('Helvetica')
//           .text('Signature', { align: 'right' });
    
//     // Add disclaimer at the bottom
//     pdfDoc.moveDown(2);
//     pdfDoc.fontSize(8)
//           .font('Helvetica')
//           .fillColor('#94a3b8')
//           .text('This prescription is electronically generated and is valid without a physical signature.', { align: 'center' });
  
//     pdfDoc.end();
  
//     pdfStream.on("finish", async () => {
//       try {
//         // Send PDF via Email if email is provided
//         if (email) {
//           await sendEmail(email, pdfPath, patientName, doctorName);
//           console.log("Prescription email sent to:", email);
//         }
        
//         // Return success response
//         res.json({ 
//           success: true,
//           message: "Prescription generated successfully", 
//           pdfUrl: `/prescriptions/${pdfFilename}` 
//         });
//       } catch (emailError) {
//         console.error("Error sending prescription email:", emailError);
//         res.json({ 
//           success: true,
//           message: "Prescription generated but email sending failed", 
//           pdfUrl: `/prescriptions/${pdfFilename}`,
//           emailError: emailError.message
//         });
//       }
//     });
  
//   } catch (error) {
//     console.error("Failed to generate PDF:", error);
//     res.status(500).json({ 
//       error: "Failed to generate prescription", 
//       details: error.message 
//     });
//   }
// });

// // Export the router
// module.exports = router;








const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Load environment variables
const EMAIL_USER = process.env.EMAIL_USER || "harshbhanushali7705@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "hqrj exws zfkv bslp";

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Email sending function
async function sendEmail(recipientEmail, pdfPath, patientName, doctorName) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: EMAIL_USER,
    to: recipientEmail,
    subject: `Medical Prescription from Dr. ${doctorName}`,
    text: `Dear ${patientName},\n\nPlease find attached your medical prescription from Dr. ${doctorName}.\n\nRegards,\nRural Health+ Team`,
    attachments: [
      {
        filename: `Prescription_${patientName}.pdf`,
        path: pdfPath,
        contentType: 'application/pdf'
      }
    ]
  };

  // Send email
  return transporter.sendMail(mailOptions);
}

router.post("/generate-pdf", async (req, res) => {
  try {
    const { patientName, age, email, medicines, diagnosis, doctorName, date } = req.body;
    
    // Validate required fields
    if (!patientName || !doctorName) {
      return res.status(400).json({ error: "Patient name and doctor name are required" });
    }
    
    // Validate email if provided
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    // Validate medicines array
    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ error: "At least one medicine is required" });
    }

    // Create prescriptions directory if it doesn't exist
    const prescriptionsDir = path.join(__dirname, '../prescriptions');
    if (!fs.existsSync(prescriptionsDir)) {
      fs.mkdirSync(prescriptionsDir, { recursive: true });
    }

    // Create a unique filename
    const timestamp = Date.now();
    const sanitizedPatientName = patientName.replace(/[^a-zA-Z0-9]/g, '_');
    const pdfFilename = `${sanitizedPatientName}_${timestamp}.pdf`;
    const pdfPath = path.join(prescriptionsDir, pdfFilename);
  
    // Create PDF document
    const pdfDoc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });
    
    const pdfStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(pdfStream);
  
    // Add hospital/clinic logo or header
    pdfDoc.fontSize(24)
          .font('Helvetica-Bold')
          .fillColor('#2563eb')
          .text("Medical Prescription", { align: "center" })
          .moveDown(0.5);
    
    // Add horizontal line
    pdfDoc.moveTo(50, pdfDoc.y)
          .lineTo(pdfDoc.page.width - 50, pdfDoc.y)
          .stroke('#2563eb')
          .moveDown(0.5);
    
    // Current date
    const currentDate = date || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    pdfDoc.fontSize(10)
          .font('Helvetica')
          .fillColor('#64748b')
          .text(`Date: ${currentDate}`, { align: 'right' })
          .moveDown(1);
        
    // Patient Info section
    pdfDoc.fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#1e293b')
          .text('Patient Information:')
          .moveDown(0.5);
    
    pdfDoc.fontSize(11)
          .font('Helvetica')
          .text(`Name: ${patientName}`);
    
    if (age) {
      pdfDoc.text(`Age: ${age}`);
    }
    
    if (diagnosis) {
      pdfDoc.moveDown(0.5)
            .font('Helvetica-Bold')
            .text('Diagnosis:')
            .font('Helvetica')
            .text(diagnosis);
    }
    
    pdfDoc.moveDown(1.5);
    
    // Medicines section
    pdfDoc.fontSize(12)
          .font('Helvetica-Bold')
          .text('Prescribed Medications:')
          .moveDown(0.5);
    
    medicines.forEach((med, index) => {
      pdfDoc.fontSize(11)
            .font('Helvetica-Bold')
            .text(`${index + 1}. ${med.name} - ${med.dosage}`);
      
      if (med.frequency) {
        pdfDoc.fontSize(10)
              .font('Helvetica')
              .text(`   Frequency: ${med.frequency}`);
      }
      
      if (med.instructions) {
        pdfDoc.fontSize(10)
              .font('Helvetica')
              .text(`   Instructions: ${med.instructions}`);
      }
      
      pdfDoc.moveDown(0.5);
    });
    
    // Footer with doctor information
    pdfDoc.moveDown(2);
    pdfDoc.fontSize(11)
          .font('Helvetica-Bold')
          .text(`Dr. ${doctorName}`, { align: 'right' });
    
    // Add a signature line
    pdfDoc.moveTo(pdfDoc.page.width - 200, pdfDoc.y + 20)
          .lineTo(pdfDoc.page.width - 50, pdfDoc.y + 20)
          .stroke();
    
    pdfDoc.fontSize(10)
          .font('Helvetica')
          .text('Signature', { align: 'right' });
    
    // Add disclaimer at the bottom
    pdfDoc.moveDown(2);
    pdfDoc.fontSize(8)
          .font('Helvetica')
          .fillColor('#94a3b8')
          .text('This prescription is electronically generated and is valid without a physical signature.', { align: 'center' });
  
    pdfDoc.end();
  
    pdfStream.on("finish", async () => {
      try {
        // Send PDF via Email if email is provided
        if (email) {
          await sendEmail(email, pdfPath, patientName, doctorName);
          console.log("Prescription email sent to:", email);
        }
        
        // Return success response
        res.json({ 
          success: true,
          message: "Prescription generated successfully", 
          pdfUrl: `/prescriptions/${pdfFilename}` 
        });
      } catch (emailError) {
        console.error("Error sending prescription email:", emailError);
        res.json({ 
          success: true,
          message: "Prescription generated but email sending failed", 
          pdfUrl: `/prescriptions/${pdfFilename}`,
          emailError: emailError.message
        });
      }
    });
  
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    res.status(500).json({ 
      error: "Failed to generate prescription", 
      details: error.message 
    });
  }
});

// Make sure to export the router correctly
module.exports = router;
