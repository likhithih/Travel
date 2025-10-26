import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: function() { return !this.googleId; },
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: function() { return !this.googleId; },
        minlength: 6
    },
    confirmPassword: {
        type: String,
        minlength: 6
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    googleDisplayName: {
        type: String,
        trim: true
    },
    googlePhotoURL: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
