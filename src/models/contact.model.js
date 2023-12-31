const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: { 
            type: String,
            required: true,
        },
        readed: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Contact', contactSchema);