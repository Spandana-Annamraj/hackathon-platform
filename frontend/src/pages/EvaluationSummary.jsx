import { useEffect, useState } from "react";
import axios from "axios";

const EvaluationSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/admin/evaluation-summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data.summary);
      } catch (err) {
        console.error("Error fetching evaluation summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 w-full bg-blue-600 text-white">Evaluation Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : summary.length === 0 ? (
        <p>No evaluations found.</p>
      ) : (
        <table className="min-w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Team ID</th>
              <th className="py-2 px-4 border">Project Title</th>
              
               <th className="py-2 px-4 border">Total Score</th> 
              <th className="py-2 px-4 border">Total Evaluations</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 border">{item.teamId}</td>
                <td className="py-2 px-4 border">{item.projectTitle}</td>
               
                <td className="py-2 px-4 border">{item.totalScore}</td>
                <td className="py-2 px-4 border">{item.totalEvaluations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EvaluationSummary;
