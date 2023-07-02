require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

class AuthService {
    async hasValidCredentials(email, password) {
        try {
            const hashedPassword = await bcrypt.hashSync(password, parseInt(proccess.env.SALT_ROUNDS) | 10);
            const user = await User.findOne({ email });

            if (user && hashedPassword === user.password) {
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            throw new Error("Error al validar credenciales");
        }
    }
}

module.exports = new AuthService();
