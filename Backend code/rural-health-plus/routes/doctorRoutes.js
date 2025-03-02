// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all pending doctors
router.get('/pending', async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error('Error fetching pending doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all approved doctors
router.get('/approved', async (req, res) => {
  try {
    const approvedDoctors = await Doctor.find({ status: 'approved' })
      .select('-password')
      .sort({ fullName: 1 });
    
    res.status(200).json(approvedDoctors);
  } catch (error) {
    console.error('Error fetching approved doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all rejected doctors
router.get('/rejected', async (req, res) => {
  try {
    const rejectedDoctors = await Doctor.find({ status: 'rejected' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.status(200).json(rejectedDoctors);
  } catch (error) {
    console.error('Error fetching rejected doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve a doctor
router.patch('/:id/approve', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json({ 
      message: 'Doctor approved successfully',
      doctor
    });
  } catch (error) {
    console.error('Error approving doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject a doctor
router.patch('/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        rejectionReason: reason || 'Application rejected by admin'
      },
      { new: true }
    ).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json({ 
      message: 'Doctor rejected successfully',
      doctor
    });
  } catch (error) {
    console.error('Error rejecting doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
