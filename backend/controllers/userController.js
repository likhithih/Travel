import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Google Sign-In registration/login
export const googleSignIn = async (req, res) => {
    try {
        const { googleId, email, displayName, photoURL } = req.body;

        // Check if user already exists with this Google ID or email
        let user = await User.findOne({ $or: [{ googleId }, { email }] });

        if (user) {
            // If user exists but doesn't have Google ID, update it
            if (!user.googleId) {
                user.googleId = googleId;
                user.googleDisplayName = displayName;
                user.googlePhotoURL = photoURL;
                await user.save();
            }
        } else {
            // Create new user for Google sign-in
            user = new User({
                email,
                googleId,
                googleDisplayName: displayName,
                googlePhotoURL: photoURL,
                // Set default values for required fields that are not provided by Google
                username: displayName.replace(/\s+/g, '').toLowerCase() + Math.random().toString(36).substr(2, 5),
                address: {
                    city: 'Not Provided',
                    pincode: '000000',
                    country: 'Not Provided'
                }
            });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Google sign-in successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                googleDisplayName: user.googleDisplayName,
                googlePhotoURL: user.googlePhotoURL,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Google sign-in error:', error);
        res.status(500).json({ message: 'Server error during Google sign-in' });
    }
};


// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword, address } = req.body;
        // address should be an object with street, city, state, pincode, country

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            address
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET , { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET , { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
