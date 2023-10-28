const jwt = require('jsonwebtoken');
const { basedir } = global;
const { User } = require(`../schemas/user`);
const { createError } = require(`../helpers`);
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
console.log('entrando a auth')
    const { authorization = "" } = req.headers; 
    const [ bearer, token ] = authorization.split(' ');
    console.log('token: ',token)
    console.log('secreta: ',SECRET_KEY)
    if (bearer !== 'Bearer') {
        console.log('bearer diferente')
        next(createError(401, "Not authorized Bearer diferent"));
    }

    try {
        console.log('entrando al try')
        const { id } = jwt.verify(token, SECRET_KEY);
        // console.log('el id: ', id)
        const user = await User.findById(id);
        console.log('el usuario: ', user)
        if (!user || !user.token) {
            console.log('aqui toy')
            next(createError(401, "Not authorized"));
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("por otro lado")
        next(createError(401, "Not authorized"));
    }
}

module.exports = auth;