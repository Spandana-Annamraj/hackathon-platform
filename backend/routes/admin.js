const express = require('express');
const router = express.Router();
const {
  getEvaluationSummary,
  setSubmissionWindow,
  getSubmissionWindow
} = require('../controllers/adminController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');


// Set Submission Window - only admin
router.post('/set-submission-window', setSubmissionWindow);

// Get Submission Window - open to anyone
router.get('/submission-window', getSubmissionWindow);

module.exports = router;
