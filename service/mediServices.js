

const Medication = require('../models/Medication');

async function getAllMedications() {
    try {
        return await Medication.getAllMedications();
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching medications');
    }
}

async function getMedicationById(medicationId) {
    try {
        return await Medication.getMedicationById(medicationId);
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching medication by ID');
    }
}

async function addMedication(medicationData) {
    try {
        // Validate medicationData if necessary
        return await Medication.addMedication(medicationData);
    } catch (err) {
        console.error(err);
        throw new Error('Error adding medication');
    }
}

async function updateMedication(medicationId, medicationData) {
    try {
        // Validate medicationData if necessary
        return await Medication.updateMedication(medicationId, medicationData);
    } catch (err) {
        console.error(err);
        throw new Error('Error updating medication');
    }
}

async function deleteMedication(medicationId) {
    try {
        return await Medication.deleteMedication(medicationId);
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting medication');
    }
}

module.exports = {
    getAllMedications,
    getMedicationById,
    addMedication,
    updateMedication,
    deleteMedication
};
