const Evaluation = require('../models/Evaluation');
const SubmissionWindow = require('../models/SubmissionWindow');
const Project = require('../models/Project');


// GET /admin/evaluation-summary
const getEvaluationSummary = async (req, res) => {
  try {
    const summary = await Evaluation.aggregate([
       {
    $addFields: {
      totalScore: {
        $add: [
          "$scores.innovation",
          "$scores.usability",
          "$scores.design",
          "$scores.presentation"
        ]
      }
    }
  },
  {
        $group: {
          _id: "$project",
          totalScore:{$sum:"$totalScore"},
          totalEvaluations: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "project"
        }
      },
      { $unwind: "$project" },
      {
        $project: {
          _id: 0,
          projectTitle: "$project.title",
          teamId: "$project.teamID",
          totalScore:1,
          totalEvaluations: 1
        }
      },
       { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};

// POST /admin/set-submission-window
const setSubmissionWindow = async (req, res) => {
  let { startTime, endTime } = req.body;

  try {
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    if (startTime >= endTime) {
      return res.status(400).json({ error: 'startTime must be before endTime' });
    }

    const now = new Date();
    const isOpen = now >= startTime && now <= endTime;

    const window = await SubmissionWindow.findOneAndUpdate(
      {},
      { startTime, endTime, isOpen, updatedAt: now },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Submission window set successfully', window });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to set submission window' });
  }
};

// GET /admin/submission-window
const getSubmissionWindow = async (req, res) => {
  try {
    const window = await SubmissionWindow.findOne();
    if (!window) {
      return res.status(404).json({ message: 'No submission window set' });
    }

    const now = new Date();
    const isOpenNow = now >= window.startTime && now <= window.endTime;

    res.status(200).json({
      startTime: window.startTime,
      endTime: window.endTime,
      isOpen: isOpenNow
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get submission window' });
  }
};

module.exports = {
  getEvaluationSummary,
  setSubmissionWindow,
  getSubmissionWindow
};
