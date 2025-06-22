import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  createNotification
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { notificationLimiter } from '../middlewares/rateLimiter.js';


const router = express.Router();
router.use(notificationLimiter);

router.get('/', authMiddleware, getNotifications);
router.post('/create-notification', authMiddleware, createNotification);
router.patch('/:id/read', authMiddleware, markAsRead);
// router.patch('/read-all', authMiddleware, markAllAsRead);
// router.get('/unread-count', authMiddleware, getUnreadCount);
router.patch('/read-all', authMiddleware, markAllAsRead);
router.get('/unread-count', authMiddleware, getUnreadCount);



export default router;
