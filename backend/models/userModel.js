const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signUp = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields are required.');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough.');
    }

    const isExisting = await this.findOne({ email });

    if (isExisting) {
        throw Error('Email is already in use.');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
}

userSchema.statics.signIn = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields are required.');
    }

    const user = await this.findOne({ email });
    
    if (!user) {
        throw Error('Invalid login credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Invalid login credentials');
    }
    
    return user
}

module.exports = mongoose.model('User', userSchema);