import express from 'express';
import { updateNotificationPreferences } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.patch('/preferences', authMiddleware, updateNotificationPreferences);

export default router;
