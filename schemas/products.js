const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = Schema({
    categories: {
        type: String,
        required: [true, 'categories is required'],
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
    },
    title: {
        type: String,
        required: [true, 'Name is required'],
    },
    calories: {
        type: Number,
        required: [true, 'Calories is required'],
    },
    groupBloodNotAllowed: {
        1: { type: Boolean, required: true },
        2: { type: Boolean, required: true },
        3: { type: Boolean, required: true },
        4: { type: Boolean, required: true },
     },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    categories: Joi.string().required(),
    weight: Joi.string().required(),
    title: Joi.string().required(),
    calories: Joi.string().required(),
    groupBloodNotAllowed: Joi.string()
});

const schemas = {
    register: registerSchema
};

const Product = model('product', productSchema);

module.exports = {
    Product,
    schemas
};