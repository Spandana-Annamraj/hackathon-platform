const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scores: {
    innovation: { type: Number, required: true },      // score out of 10
    usability: { type: Number, required: true },       // score out of 10
    design: { type: Number, required: true },          // score out of 10
    presentation: { type: Number, required: true },    // score out of 10
  },
  comments: String,
  totalScore: { type: Number }, // calculated as sum or weighted average
  evaluatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
