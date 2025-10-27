import User from '../models/User.js';

// Get all users for admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }, '-password -confirmPassword').sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Users retrieved successfully',
            users: users.map(user => ({
                id: user._id,
                name: user.username || user.googleDisplayName,
                email: user.email,
                phone: user.phone || '', // Assuming phone might be added later
                status: user.status || 'active', // Assuming status field, default to active
                joinDate: user.createdAt.toISOString().split('T')[0],
                bookings: 0, // Placeholder, will need booking model
                avatar: user.googleDisplayName ? user.googleDisplayName.split(' ').map(n => n[0]).join('').toUpperCase() : (user.username ? user.username.slice(0, 2).toUpperCase() : 'U')
            }))
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error retrieving users' });
    }
};

// Update user status
export const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;

        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { status },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User status updated successfully',
            user: {
                id: user._id,
                name: user.username || user.googleDisplayName,
                email: user.email,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Update user status error:', error);
        res.status(500).json({ message: 'Server error updating user status' });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error deleting user' });
    }
};

// Update user details
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, phone } = req.body;

        const updateData = {};
        if (name) updateData.username = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.username || user.googleDisplayName,
                email: user.email,
                phone: user.phone || '',
                status: user.status || 'active',
                joinDate: user.createdAt.toISOString().split('T')[0],
                bookings: 0,
                avatar: user.googleDisplayName ? user.googleDisplayName.split(' ').map(n => n[0]).join('').toUpperCase() : (user.username ? user.username.slice(0, 2).toUpperCase() : 'U')
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error updating user' });
    }
};
