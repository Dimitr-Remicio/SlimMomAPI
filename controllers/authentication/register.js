const bcrypt = require('bcryptjs');
const { User, schemas } = require(`../../schemas/user`);
const { createError } = require(`../../helpers`);
const tokenService =require('../../config/tokenService')

const register = async (req, res) => {
    const { error } = schemas.register.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = tokenService.generateVerificationToken();
    const result = await User.create({...req.body, password: hashPassword, verificationToken});
    res.status(201).json({
        user: {
            email: result.email,
            token:verificationToken,
            // subscription: result.subscription,
        },
    });
}

module.exports = register;