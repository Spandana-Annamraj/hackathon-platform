const mongoose = require('mongoose');

const submissionWindowSchema = new mongoose.Schema({
  isOpen: { type: Boolean, default: false },
  startTime: Date,
  endTime: Date,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubmissionWindow', submissionWindowSchema);
