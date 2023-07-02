require('dotenv').config();
const UserService = require('../services/user.service');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.status(200).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getUsers",
                message: err.message,
            });
        }
    }

    async getUserById(req, res) {
        try {
            let user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    method: "getUserById",
                    message: "Usuario no encontrado",
                });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getUserById",
                message: err.message,
            });
        }
    }

    async createUser(req, res) {
        try {
            let newUser = await UserService.createUser(req.body);
            return res.status(201).json({
                message: "User Created!",
                user: newUser,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                method: "createUser",
                message: err.message});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            let isUserRegistered = await auth.hasValidCredentiales(email, password);
            if (!isUserRegistered) {
                const user = await UserService.getUserByEmail(email);
                const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
                    expiresIn: proccess.env.EXPIRES_IN,
                });

                return res.status(200).json({
                    status: 200,
                    token,
                    message: "Access token created successfully",
                });
            } else {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "login",
                message: err.message,
            });
        }
    }
}

module.exports = new UserController();