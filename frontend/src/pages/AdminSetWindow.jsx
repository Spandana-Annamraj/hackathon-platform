// AdminSetWindow.jsx
import { useState } from "react";
import axios from "axios";

const AdminSetWindow = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/admin/set-submission-window", {
        startTime,
        endTime,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Submission window set successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to set submission window");
    }
  };

  return (
    <div className=" max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set Submission Window</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="datetime-local" onChange={(e) => setStartTime(e.target.value)} className="w-full p-2 border" />
        <input type="datetime-local" onChange={(e) => setEndTime(e.target.value)} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Set Window</button>
      </form>
    </div>
  );
};

export default AdminSetWindow;
