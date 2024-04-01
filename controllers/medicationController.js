// medicationController.js

const medicationService = require('../service/mediServices'); // Assuming medicationService.js contains the service functions for medications

// Controller function to handle GET request for all medications
async function getAllMedications(req, res) {
    try {
        const medications = await medicationService.getAllMedications();
        res.json(medications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching medications');
    }
}

// Controller function to handle GET request for a specific medication by ID
async function getMedicationById(req, res) {
    const { id } = req.params;
    try {
        const medication = await medicationService.getMedicationById(id);
        if (!medication) {
            return res.status(404).send('Medication not found');
        }
        res.json(medication);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching medication');
    }
}

// Controller function to handle POST request to add a new medication
async function addMedication(req, res) {
    const medicationData = req.body;
    try {
        const newMedicationId = await medicationService.addMedication(medicationData);
        res.status(201).json({ id: newMedicationId, ...medicationData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding medication');
    }
}

// Controller function to handle PUT request to update an existing medication
async function updateMedication(req, res) {
    const { id } = req.params;
    const medicationData = req.body;
    try {
        const updatedMedication = await medicationService.updateMedication(id, medicationData);
        if (!updatedMedication) {
            return res.status(404).send('Medication not found');
        }
        res.json(updatedMedication);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating medication');
    }
}

// Controller function to handle DELETE request to delete a medication
async function deleteMedication(req, res) {
    const { id } = req.params;
    try {
        await medicationService.deleteMedication(id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting medication');
    }
}

module.exports = {
    getAllMedications,
    getMedicationById,
    addMedication,
    updateMedication,
    deleteMedication
};
