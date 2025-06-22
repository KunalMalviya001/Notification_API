import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { notificationLimiter } from '../middleware/rateLimiter.js';


router.use(notificationLimiter);

const router = express.Router();

router.get('/', authMiddleware, getNotifications);
router.patch('/:id/read', authMiddleware, markAsRead);
// router.patch('/read-all', authMiddleware, markAllAsRead);
// router.get('/unread-count', authMiddleware, getUnreadCount);
router.patch('/read-all', protect, markAllAsRead);
router.get('/unread-count', protect, getUnreadCount);



export default router;
