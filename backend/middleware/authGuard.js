const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function authGuard(req, res, next) {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: "Auth token required!"
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Request unauthorized!"
        });
    }
}

module.exports = authGuard;