const IP_ADDRESS = '10.10.10.215';
const PORT = 3000;

// Import required modules
const express = require('express');
const medicationRoutes = require('./routes/mediRoutes');

// Create an Express application
const app = express();

// Define middleware to parse JSON requests
app.use(express.json());

// Define medication routes
app.use('/api/medications', medicationRoutes);

// Define a default route
app.get('/', (req, res) => {
    res.send('Welcome to Utibu!');
});

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
