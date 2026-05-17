const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true }, // raw password stored as-is

  role: {
    type: String,
    enum: ['participant', 'judge', 'admin'],
   
  },

  college: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.role === 'participant') return !!v;
        return true;
      },
      message: 'College is required for participants'
    }
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    validate: {
      validator: function (v) {
        if (this.role === 'participant') return !!v;
        return true;
      },
      message: 'Team is required for participants'
    }
  }
});

module.exports = mongoose.model('User', userSchema);
