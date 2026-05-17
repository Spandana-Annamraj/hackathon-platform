const express = require('express');
const router = express.Router();
const { getEvaluationSummary } = require('../controllers/adminController'); // or wherever you keep it
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/evaluation-summary', authMiddleware, getEvaluationSummary);

module.exports = router;
