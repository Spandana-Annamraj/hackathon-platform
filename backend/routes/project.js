// routes/project.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Team = require('../models/Team');
const Project = require('../models/Project');
const SubmissionWindow = require('../models/SubmissionWindow');

// Submit Project - Only by Team Leader
router.post('/submit', authMiddleware, async (req, res) => {
  const { title, description, githubLink, deployedLink, techStack } = req.body;

  try {
    // Check if submission window is open
    const window = await SubmissionWindow.findOne();
    if (!window) {
      return res.status(500).json({ error: 'Submission window not set' });
    }

    const now = new Date();
    if (now < window.startTime || now > window.endTime) {
      return res.status(403).json({ error: 'Submission is not allowed at this time' });
    }

    // Find user and team
    const user = await User.findById(req.user.id).populate('team');
    if (!user || !user.team) {
      return res.status(400).json({ error: 'User not part of any team' });
    }

    const team = await Team.findById(user.team);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Only team leader can submit
    if (String(team.leader) !== String(user._id)) {
      return res.status(403).json({ error: 'Only the team leader can submit the project' });
    }

    // Prevent duplicate submission
    const existing = await Project.findOne({ team: team._id });
    if (existing) {
      return res.status(400).json({ error: 'Project already submitted by this team' });
    }

    // Create project
    const project = new Project({
      title,
      description,
      githubLink,
      deployedLink,
      techStack,
      teamName: team.teamName,
      teamID: team.teamID,
      submittedBy: user._id,
      team: team._id
    });

    await project.save();

    // Optionally update the team with project info
    await Team.findByIdAndUpdate(team._id, {
      projectTitle: title,
      githubLink,
      deploymentLink: deployedLink
    });

    res.status(201).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    console.error('Project submission error:', error);
    res.status(500).json({ error: 'Server error during submission' });
  }
});

module.exports = router;
