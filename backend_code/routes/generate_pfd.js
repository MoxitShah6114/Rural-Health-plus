const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const PDFDocument = require("pdfkit");

router.post("/generate-pdf", async (req, res) => {
    try {
        const { patientName, age, email, medicines, diagnosis, doctorName, date } = req.body;
  
        const pdfDoc = new PDFDocument();
        const pdfPath = `./prescriptions/${patientName}_${Date.now()}.pdf`;
  
        if (!fs.existsSync("./prescriptions")) {
            fs.mkdirSync("./prescriptions");
        }
  
        const pdfStream = fs.createWriteStream(pdfPath);
        pdfDoc.pipe(pdfStream);
  
        // Header
        pdfDoc.fontSize(20).text("Medical Prescription", { align: "center" }).moveDown();
        
        // Patient Info
        pdfDoc.fontSize(14).text(`Patient Name: ${patientName}`);
        pdfDoc.text(`Age: ${age}`);
        pdfDoc.text(`Diagnosis: ${diagnosis}`);
        pdfDoc.text(`Date: ${date}`);
        pdfDoc.moveDown();
  
        // Medicines
        pdfDoc.text("Prescribed Medicines:", { underline: true });
        medicines.forEach((med, index) => {
            pdfDoc.text(`${index + 1}. ${med.name} - ${med.dosage}`);
        });
  
        pdfDoc.moveDown();
        pdfDoc.text(`Doctor: ${doctorName}`);
  
        pdfDoc.end();
  
        pdfStream.on("finish", async () => {
            // Send PDF via Email
            await sendEmail(email, pdfPath);
            res.json({ message: "PDF Generated & Sent!", pdfUrl: pdfPath });
        });
  
    } catch (error) {
        res.status(500).json({ error: "Failed to generate PDF" });
    }
  });
  
  // Function to Send Email
  async function sendEmail(toEmail, attachmentPath) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
  
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "harshbhanushali7705@gmail.com",
        subject: "Your Medical Prescription",
        text: "Attached is your medical prescription.",
        attachments: [{ filename: "prescription.pdf", path: attachmentPath }],
    };
  
    await transporter.sendMail(mailOptions);
  }

module.exports = router;