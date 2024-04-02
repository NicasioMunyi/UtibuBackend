
const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Route to get all medications
router.get('/', medicationController.getAllMedications);

// Route to get medication by ID
router.get('/:id', medicationController.getMedicationById);

// Route to add a new medication
router.post('/', medicationController.addMedication);

// Route to update an existing medication
router.put('/:id', medicationController.updateMedication);

// Route to delete a medication
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
