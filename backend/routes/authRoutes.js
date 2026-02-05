import express from 'express';
import { registerUser, loginUser, loginWithGoogle, loginWithFacebook } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', loginWithGoogle);
router.post('/facebook', loginWithFacebook);

export default router;
