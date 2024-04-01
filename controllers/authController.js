const bcrypt = require('bcrypt');
const User = require('../models/User');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.createUser({ username, email, password: hashedPassword });
        res.status(201).json({ userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }
        console.log(user)
        req.session.userId = user.user_id;
        res.send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
}

module.exports = { registerUser, loginUser };
