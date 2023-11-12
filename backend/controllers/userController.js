const User = require('../models/userModel');
const mongoose = require('mongoose');

async function userLogin(req, res) {
    res.json({
        msg: 'This is the login page'
    });
}

async function userRegister(req, res) {
    res.json({
        msg: 'This is the register page'
    });
}

module.exports = {
    userLogin,
    userRegister
}