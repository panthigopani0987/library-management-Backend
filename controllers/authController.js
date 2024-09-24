const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({ message: 'User Register' });

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error registering user' });
    }
}

//login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error login user' });
    }
}

module.exports = {
    register,
    login
}