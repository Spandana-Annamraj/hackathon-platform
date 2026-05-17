const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  githubLink: { type: String },
  deployedLink: { type: String },
  techStack: { type: [String] },  // Array of strings for tech stack
  teamName: { type: String },
  teamID: { type: String,
    unique :true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
