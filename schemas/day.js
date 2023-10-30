const { Schema, model } = require('mongoose');
const Joi = require('joi');

const daytSchema = Schema({
    eatenProducts: [
        {
           title: { type: String, required: true },
           weight: { type: Number, required: true },
           kcal: { type: Number, required: true },
        },
     ],
     date: { type: String, required: true },
     daySummary: {
      kcalLeft: { type: Number, required: true },
      kcalConsumed: { type: Number, required: true },
      dailyRate: { type: Number, required: true },
      percentsOfDailyRate: { type: Number, required: true },
     },
     notAllowedProducts: { type: Array },
    }, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    date: Joi.string().required(),
    weight: Joi.string().required(),
    title: Joi.string().required(),
    calories: Joi.string().required(),
    groupBloodNotAllowed: Joi.string()
});

const schemas = {
    register: registerSchema
};

const Day = model('product', daytSchema);

module.exports = {
    Day,
    schemas
};