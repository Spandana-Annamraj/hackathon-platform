const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project'); 
const { authMiddleware, authorizeRoles } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/project', projectRoutes);
const judgeRoutes = require('./routes/judge');

app.use('/judge', judgeRoutes);


const evaluationSummaryRoutes = require('./routes/evaluationSummaryRoutes');
app.use('/admin', evaluationSummaryRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Hackathon Backend Running!');
});

// Existing project routes
const Project = require('./models/Project');
app.post('/projects', authMiddleware, authorizeRoles('participant'), async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/projects', authMiddleware, authorizeRoles('judge', 'admin'), async (req, res) => {
  try {
    const projects = await Project.find().populate('team', 'teamName teamID');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const adminRoutes = require('./routes/admin');
app.use('/admin',adminRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
