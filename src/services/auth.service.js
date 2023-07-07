require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

class AuthService {
    async hasValidCredentials(email, password) {
        try {
            const user = await User.findOne({ email });
            console.log(user);
            console.log(await bcrypt.compare(password, user.password));
            if (user && await bcrypt.compare(password, user.password)) {
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
