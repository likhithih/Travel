import Router from 'express';
import { registerUser, loginUser, adminLogin, googleSignIn, getProfile } from '../controllers/userController.js';
import { getAllUsers, updateUserStatus, deleteUser, updateUser } from '../controllers/adminController.js';
import {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    upload
} from '../controllers/destinationController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// Admin login route
router.post('/admin-login', adminLogin);
// Google sign-in route
router.post('/google-signin', googleSignIn);
// Profile route
router.get('/profile', authenticateToken, getProfile);

// Admin routes
router.get('/admin/users', authenticateToken, requireAdmin, getAllUsers);
router.put('/admin/users/:userId/status', authenticateToken, requireAdmin, updateUserStatus);
router.put('/admin/users/:userId', authenticateToken, requireAdmin, updateUser);
router.delete('/admin/users/:userId', authenticateToken, requireAdmin, deleteUser);

// Destination routes (Admin only for now)
router.get('/admin/destinations', authenticateToken, requireAdmin, getAllDestinations);
router.get('/destinations/:id', getDestinationById); // Public route for frontend
router.post('/admin/destinations', authenticateToken, requireAdmin, upload.single('image'), createDestination);
router.put('/admin/destinations/:id', authenticateToken, requireAdmin, upload.single('image'), updateDestination);
router.delete('/admin/destinations/:id', authenticateToken, requireAdmin, deleteDestination);

export default router;
