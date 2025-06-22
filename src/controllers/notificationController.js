import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const createNotification = async (req, res) => {
  try {
    const { type, receiverId, postId, commentId, fromUserId } = req.body;

    // Validate required fields
    if (!type || !receiverId || !fromUserId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if receiver user exists
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Receiver user not found' });

    // Optional: check if fromUser exists
    const fromUser = await User.findById(fromUserId);
    if (!fromUser) return res.status(404).json({ message: 'From user not found' });

    // Create notification data
    const notificationData = {
      type,          // 'follow', 'like', 'comment'
      receiver: receiverId,
      fromUser: fromUserId,
      read: false,
    };

    // Attach postId or commentId if applicable
    if (postId) notificationData.post = postId;
    if (commentId) notificationData.comment = commentId;

    // Save notification
    const notification = new Notification(notificationData);
    await notification.save();

    res.status(201).json({ message: 'Notification created', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ receiverId: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(notification);
};

// export const markAllAsRead = async (req, res) => {
//   await Notification.updateMany({ receiverId: req.user.id }, { read: true });
//   res.json({ message: 'All notifications marked as read' });
// };

// export const getUnreadCount = async (req, res) => {
//   const count = await Notification.countDocuments({ receiverId: req.user.id, read: false });
//   res.json({ count });
// };

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false
    });
    res.status(200).json({ unread: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
