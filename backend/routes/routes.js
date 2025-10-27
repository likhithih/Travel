import Router from 'express';
import { registerUser, loginUser, adminLogin, googleSignIn } from '../controllers/userController.js';
import { getAllUsers, updateUserStatus, deleteUser, updateUser } from '../controllers/adminController.js';
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

// Admin routes
router.get('/admin/users', authenticateToken, requireAdmin, getAllUsers);
router.put('/admin/users/:userId/status', authenticateToken, requireAdmin, updateUserStatus);
router.put('/admin/users/:userId', authenticateToken, requireAdmin, updateUser);
router.delete('/admin/users/:userId', authenticateToken, requireAdmin, deleteUser);

export default router;
