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


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };
  
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
const user = this;
return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
const user = this;
if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
}
next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
