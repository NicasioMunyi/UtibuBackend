const IP_ADDRESS = '10.10.11.82';
const PORT = 3000;

// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define middleware to parse JSON requests
app.use(express.json());

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a route handler for an API endpoint
app.get('/api/data', (req, res) => {
    const data = { message: 'This is sample data from the API' };
    res.json(data);
});

// Sample data for medications
const medications = [
    { id: 1, name: 'Medication A', amount: '5 pills' },
    { id: 2, name: 'Medication B', amount: '10 tablets' },
    { id: 3, name: 'Medication C', amount: '1 injection' }
];

// Define a route handler to return list of medications
app.get('/api/endpoint1', (req, res) => {
    res.json(medications);
});

// Start the Express server
app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
