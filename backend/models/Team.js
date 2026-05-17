const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamID: { type: String, required: true, unique: true }, // e.g. TEAM-X1Y2Z3
  college: { type: String, required: true },
  members: [memberSchema],
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // user who created the team
});

module.exports = mongoose.model('Team', teamSchema);
