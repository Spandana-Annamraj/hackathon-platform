const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate team ID
function generateTeamID() {
  return 'TEAM-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, college, teamName, members } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    if (role === 'participant') {
      if (!college || !teamName || !members || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ error: 'College, teamName, and members are required for participants' });
      }
      members.unshift({ name, email });
    }

    const lowercasedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowercasedEmail });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    let user;

    if (role === 'participant') {
      const teamID = generateTeamID();
      const team = new Team({
        teamName,
        teamID,
        college,
        members,
        leader: null // will assign after user creation
      });

      user = new User({
        name,
        email: lowercasedEmail,
        password,
        role,
        college,
        team: team._id
      });

      await user.save();

      team.leader = user._id;
      await team.save();

    } else {
      user = new User({
        name,
        email: lowercasedEmail,
        password,
        role
      });
      await user.save();
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User and team registered successfully',
      token,
      user: {
        name: user.name,
        role: user.role,
        teamID: user.team ? (await Team.findById(user.team)).teamID : undefined
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).populate('team');

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        teamID: user.team ? user.team.teamID : undefined
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
