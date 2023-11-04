const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    // name: Joi.string().required(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const upDatedataUser = Joi.object({
    heit: Joi.string(), //add all data to usre
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
    updateSubscription: upDatedataUser
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
};