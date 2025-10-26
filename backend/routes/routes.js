import Router from 'express';
import { registerUser, loginUser, adminLogin, googleSignIn } from '../controllers/userController.js';

const router = Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// Admin login route
router.post('/admin-login', adminLogin);
// Google sign-in route
router.post('/google-signin', googleSignIn);

export default router;
