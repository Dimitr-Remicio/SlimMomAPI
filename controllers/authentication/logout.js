const { basedir } = global;
const { User } = require(`../../schemas/user`);


const logout = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    // const { contactId } = req.params;
//     const result = await User.findOne({_id});
    
//   if (!result) {
//     throw createError(404);
//   }

//   res.json(result)

    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).send();
}

module.exports = logout;