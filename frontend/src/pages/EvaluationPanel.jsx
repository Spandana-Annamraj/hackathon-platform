import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvaluationPanel = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [formData, setFormData] = useState({
    innovation: '',
    usability: '',
    design: '',
    presentation: '',
    comments: ''
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/judge/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data.projects))
    .catch(err => {
      console.error(err);
      setMessage('Failed to load projects');
    });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTitle) {
      setMessage('Please select a project');
      return;
    }

    for (let field of ['innovation', 'usability', 'design', 'presentation']) {
      const val = parseInt(formData[field]);
      if (isNaN(val) || val < 0 || val > 10) {
        setMessage(`${field} must be between 0 and 10`);
        return;
      }
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/judge/evaluate',
        { projectTitle: selectedTitle, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Evaluation submitted');
      setFormData({ innovation: '', usability: '', design: '', presentation: '', comments: '' });
      setSelectedTitle('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Evaluate Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select a Project</option>
          {projects.map(p => (
            <option key={p._id} value={p.title}>
              {p.title} ({p.team?.teamName || 'No Team Name'})
            </option>
          ))}
        </select>

        {['innovation', 'usability', 'design', 'presentation'].map(field => (
          <input
            key={field}
            type="number"
            name={field}
            min="0"
            max="10"
            value={formData[field]}
            onChange={handleChange}
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (0-10)`}
            required
            className="w-full border rounded p-2"
          />
        ))}

        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Optional comments"
          className="w-full border rounded p-2"
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Submit Evaluation
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default EvaluationPanel;
