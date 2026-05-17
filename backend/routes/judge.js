
const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Project = require('../models/Project');
const Evaluation = require('../models/Evaluation');

// GET all projects
router.get('/projects', authMiddleware, authorizeRoles('judge'), async (req, res) => {
  try {
    const projects = await Project.find().populate('team', '_id teamName');
    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST: Judge evaluates a project
router.post('/evaluate', authMiddleware, authorizeRoles('judge'), async (req, res) => {
  try {
    const judgeId = req.user.id;

    const { projectTitle, innovation, usability, design, presentation, comments } = req.body;

    if (!projectTitle || innovation == null || usability == null || design == null || presentation == null) {
      return res.status(400).json({ error: 'All fields except comments are required' });
    }

    const scores = [innovation, usability, design, presentation];
    if (scores.some(score => score < 0 || score > 10)) {
      return res.status(400).json({ error: 'Scores must be between 0 and 10' });
    }

    const project = await Project.findOne({ title: projectTitle });
    if (!project) {
      return res.status(404).json({ error: 'Project not found with this title' });
    }

    const alreadyEvaluated = await Evaluation.findOne({ project: project._id, judge: judgeId });
    if (alreadyEvaluated) {
      return res.status(400).json({ error: 'Project already evaluated by this judge' });
    }

    const totalScore = innovation + usability + design + presentation;

    const evaluation = new Evaluation({
      project: project._id,
      judge: judgeId,
      scores: { innovation, usability, design, presentation },
      comments,
      totalScore,
      evaluatedAt: new Date(),
    });

    await evaluation.save();
    res.status(201).json({ message: 'Evaluation submitted successfully', evaluation });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during evaluation' });
  }
});

// GET: Evaluations (with optional filters)
router.get('/evaluations', authMiddleware, authorizeRoles('judge', 'admin'), async (req, res) => {
  try {
    const { judgeId, projectTitle, teamId } = req.query;
    let filter = {};

    if (judgeId) filter.judge = judgeId;

    if (projectTitle) {
      const project = await Project.findOne({ title: projectTitle });
      if (!project) return res.status(404).json({ error: 'Project not found' });
      filter.project = project._id;
    }

    if (teamId) {
      const projects = await Project.find({ team: teamId }).select('_id');
      filter.project = { $in: projects.map(p => p._id) };
    }

    const evaluations = await Evaluation.find(filter)
      .populate('project', 'title team')
      .populate('judge', 'name email')
      .sort({ evaluatedAt: -1 });

    res.json({ evaluations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch evaluations' });
  }
});

module.exports = router;
