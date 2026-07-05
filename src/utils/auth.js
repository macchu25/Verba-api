import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'verba-secret-key-12345';

// Generate backend JWT token
export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Middleware to verify JWT token and protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from the token and attach to req.user
      req.user = await User.findById(decoded.id).select('-createdAt');
      
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }
};
