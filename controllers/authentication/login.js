const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const secret = process.env.SECRET;
const { User, schemas } = require(`../../schemas/user`);
const { createError } = require(`../../helpers`);


const login = async (req, res) => {
    const { error } = schemas.login.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "Error",
            code: 400,
            message: "Incorrect Login or Password",
            data: "Bad Request",
          });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, 'Email or password is wrong');
    };

    const comparePassword = await bcrypt.compare(password, user.password);
    
    if (!comparePassword) {
        throw createError(401, 'Email or password is wrong');
    };

    const payload = {
        id: user._id,
        username: user.username
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    });
}

module.exports = login;