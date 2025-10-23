import Router from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);

export default router;