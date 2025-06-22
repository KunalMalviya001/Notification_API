import User from '../models/User.js';

export const updateNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { follow, like, comment } = req.body;

    if (follow !== undefined) user.notificationSettings.follow = follow;
    if (like !== undefined) user.notificationSettings.like = like;
    if (comment !== undefined) user.notificationSettings.comment = comment;

    await user.save();
    res.status(200).json({ message: 'Preferences updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
