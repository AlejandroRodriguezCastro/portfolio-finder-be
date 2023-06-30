const User = require('../models/user.model');

const createUser = async (userBody) => {
    console.log(userBody);
    return await User.create(userBody);
}   

const getUsers = async () => {
    console.log("allUsers");
    let allUsers = await User.find();   
    return allUsers;
}

module.exports = {
    createUser,
    getUsers
}