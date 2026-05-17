// src/pages/SubmissionPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmissionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    deployedLink: '',
    techStack: ''
  });
  const [message, setMessage] = useState('');
  const [allowed, setAllowed] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/submission-window', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setAllowed(res.data.isOpen))
      .catch(err => {
        console.error(err);
        setAllowed(false);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allowed) {
      setMessage('Submission window is currently closed');
      return;
    }

    const updatedFormData = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim())
    };

    try {
      const res = await axios.post('http://localhost:5000/project/submit', updatedFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message || 'Project submitted successfully!');
      setFormData({
        title: '',
        description: '',
        githubLink: '',
        deployedLink: '',
        techStack: ''
      });
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submit Your Project</h2>
      {!allowed && <p className="text-red-500 mb-4">Submissions are currently closed.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'githubLink', 'deployedLink', 'techStack'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        ))}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Project
        </button>
        {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}
      </form>
    </div>
  );
};

export default SubmissionPage;
