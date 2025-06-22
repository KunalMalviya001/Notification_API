import express from 'express';
import { updateNotificationPreferences } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.patch('/preferences', protect, updateNotificationPreferences);

export default router;
