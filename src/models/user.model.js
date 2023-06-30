const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true, // trim whitespace
            minlength: 8,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error('Password is not strong enough, must have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol, and a length of at least 8 characters');
                }
            }
        },
        contacts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact'
        }]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
