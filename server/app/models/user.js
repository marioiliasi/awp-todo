const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordEncrypted: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        deleted: {
            type: Boolean,
            required: false,
        }
    },
    { timestamps: true }
)

module.exports.User = mongoose.model('User', userSchema, 'user');
