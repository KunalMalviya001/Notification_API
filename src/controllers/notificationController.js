import Notification from '../models/Notification.js';

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
