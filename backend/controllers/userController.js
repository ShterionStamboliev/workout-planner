const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

function tokenGenerator(_id) {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });
}

async function userLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.signIn(email, password);
        const token = tokenGenerator(user._id);
        
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function userRegister(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.signUp(email, password);
        const token = tokenGenerator(user._id);

        res.status(200).json({ email, token });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    userLogin,
    userRegister
}