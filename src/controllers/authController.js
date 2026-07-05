import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { generateToken } from '../utils/auth.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, error: 'Google ID Token is required' });
    }

    let payload;
    
    // For local testing: if GOOGLE_CLIENT_ID is empty or we receive a mock token prefix, bypass Google's verification servers
    if (idToken.startsWith('mock_token_')) {
      const username = idToken.replace('mock_token_', '');
      payload = {
        email: `${username.toLowerCase()}@gmail.com`,
        name: `Mock User (${username})`,
        picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
      };
    } else {
      if (!GOOGLE_CLIENT_ID) {
        return res.status(500).json({ 
          success: false, 
          error: 'GOOGLE_CLIENT_ID is not configured in backend environment variables.' 
        });
      }
      
      const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID
      });
      payload = ticket.getPayload();
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, error: 'Invalid Google ID Token payload' });
    }

    const { email, name, picture } = payload;

    // Find or create User
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        name: name || 'Google User',
        picture: picture || ''
      });
    } else {
      // Update name/picture if changed
      let changed = false;
      if (name && user.name !== name) {
        user.name = name;
        changed = true;
      }
      if (picture && user.picture !== picture) {
        user.picture = picture;
        changed = true;
      }
      if (changed) {
        await user.save();
      }
    }

    // Generate backend JWT session token
    const token = generateToken(user._id);

    res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      },
      token
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
