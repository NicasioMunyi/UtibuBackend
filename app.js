const express = require('express');
const session = require('express-session');
const medicationRoutes = require('./routes/mediRoutes');
const userRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const crypto = require('crypto');
const myInfoRouter = require('./routes/myInfoRouter');

const secretKey = crypto.randomBytes(32).toString('hex');

const app = express();

// Configure session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());

// Define medication routes
app.use('/api/medications', medicationRoutes);

// Define user routes
app.use('/api/users', userRoutes); 

// Define order routes
app.use('/api/orders', orderRoutes);

app.use('/api', myInfoRouter);

// Define a default route
app.get('/', (req, res) => {
    res.send('Welcome to Utibu!');
});

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = '192.168.43.2';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
