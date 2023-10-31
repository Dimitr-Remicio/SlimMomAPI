const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      createdAt: {
        type: String,
        default: new Date().toLocaleDateString(),
      },
      height: {
        type: Number,
        default: null,
      },
      age: {
        type: Number,
        default: null,
      },
      currentWeight: {
        type: Number,
        default: null,
      },
      desiredWeight: {
        type: Number,
        default: null,
      },
      bloodType: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 1,
      },
      token: {
        type: String,
        default: null,
      },
      dailyRate: {
        type: Number,
        default: null,
      },
      notRecFood: {
        type: Array,
        title: {
          type: String,
        },
      },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    // email: Joi.string().pattern(emailRegexp).required(),
    // password: Joi.string().min(6).required(),
    // // name: Joi.string().required(),
    // token: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ua'] },
      })
      .required(),
    password: Joi.string().alphanum().min(8).max(100).required(),
    height: Joi.number().min(100).max(250).integer(),
    age: Joi.number().min(18).max(100).integer(),
    currentWeight: Joi.number().min(20).max(500),
    desiredWeight: Joi.number().min(20).max(500),
    bloodType: Joi.number().valid(1, 2, 3, 4),

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