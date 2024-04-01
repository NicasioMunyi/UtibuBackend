const pool = require('../config/database');
async function getAllMedications() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM medications');
        connection.release();
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching medications');
    }
}

async function getMedicationById(medicationId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM medications WHERE id = ?', [medicationId]);
        connection.release();
        return rows[0]; // Assuming medication ID is unique and returning the first row
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching medication by ID');
    }
}

// Rest of the code (addMedication, updateMedication, deleteMedication) remains the same...


async function addMedication(medicationData) {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO medications SET ?', [medicationData]);
        connection.release();
        return result.insertId; // Return the ID of the newly inserted medication
    } catch (err) {
        console.error(err);
        throw new Error('Error adding medication');
    }
}

async function updateMedication(medicationId, medicationData) {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('UPDATE medications SET ? WHERE id = ?', [medicationData, medicationId]);
        connection.release();
        if (result.affectedRows === 0) {
            throw new Error('Medication not found');
        }
        return true; // Return true to indicate successful update
    } catch (err) {
        console.error(err);
        throw new Error('Error updating medication');
    }
}

async function deleteMedication(medicationId) {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('DELETE FROM medications WHERE medication_id = ?', [medicationId]);
        connection.release();
        if (result.affectedRows === 0) {
            throw new Error('Medication not found');
        }
        return true; // Return true to indicate successful deletion
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
