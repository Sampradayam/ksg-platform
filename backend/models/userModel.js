import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    authProvider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        }
    },
    phone: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        }
    },
    age: {
        type: Number,
    }
});

const User = mongoose.model('User', userSchema);

export default User;
