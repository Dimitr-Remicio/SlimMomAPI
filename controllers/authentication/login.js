const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const secret = process.env.SECRET;
const { User, schemas } = require(`../../schemas/user`);
const { createError } = require(`../../helpers`);

// const secret = process.env.SECRET_KEY;

const login = async (req, res) => {
    const { error } = schemas.register.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, 'Email or password is wrong')
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw createError(401, 'Email or password is wrong')
    }
    const payload = {
        id: user._id,
        subscription: user.subscription
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    //const result= await User.findById(user._id)
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        // status: 'success',
        // code: 200,
        // user: {
        //     email: result.email,
        //     subscription: result.subscription,
        // },
        token,
    });
}

module.exports = login;