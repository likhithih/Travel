import Router from 'express';
import { registerUser, loginUser, googleSignIn } from '../controllers/userController.js';

const router = Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// Google sign-in route
router.post('/google-signin', googleSignIn);

export default router;
