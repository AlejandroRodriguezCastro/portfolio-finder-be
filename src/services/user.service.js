require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService{
    async getUsers(){
        try{
            const users = await User.find();
            return users;
        } catch(err){
            console.error(err);
            throw new Error('Error al obtener los usuarios');
        }
    }

    async getUserById(id){
        try {
            let user = await User.findById(id);
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario');
        }
    }

    async createUser(user){
        try {
            let isUserRegistered = await User.findOne({email: user.email});
            if(isUserRegistered){
                throw new Error('El usuario ya existe');
            }
            else{
                let newUser = new User(user);
                newUser.password = await bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS) | 10);
                await newUser.save();
                return newUser;
            }
        } catch (err) {
            console.error(err);
            throw new Error('Error al crear el usuario');
        }
    }

    async getUserByEmail(email){
        try {
            let user = await User.findOne({email: email});
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario con email');
        }
    }
}

module.exports = new UserService();