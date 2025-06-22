import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.find({ $or: [{ username }, { email }] });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ token: generateToken(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
    // console.log("Request body:", req.body);

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
