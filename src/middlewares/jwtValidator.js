require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res, next) => {
    try {
        console.log(req.headers);
        const jwtToken = jwt.verify(req.headers.jwt, process.env.SECRET_KEY);
        if (jwtToken) {
            next();
        } else {
            return res.status(401).json({
                message: "Unauthorized",
        });
    }
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};

module.exports = validateJwt;