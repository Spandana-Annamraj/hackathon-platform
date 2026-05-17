import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboard(res.data.leaderboard);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : leaderboard.length === 0 ? (
        <p>No evaluations found.</p>
      ) : (
        <table className="min-w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Rank</th>
              <th className="py-2 px-4 border">Team ID</th>
              <th className="py-2 px-4 border">Project Title</th>
              <th className="py-2 px-4 border">Total Score</th>
              <th className="py-2 px-4 border">Total Evaluations</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(({ rank, teamId, projectTitle, totalScore, totalEvaluations }) => (
              <tr key={teamId} className="border-b">
                <td className="py-2 px-4 border">{rank}</td>
                <td className="py-2 px-4 border">{teamId}</td>
                <td className="py-2 px-4 border">{projectTitle}</td>
                <td className="py-2 px-4 border">{totalScore}</td>
                <td className="py-2 px-4 border">{totalEvaluations}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
