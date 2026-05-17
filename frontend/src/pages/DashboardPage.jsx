import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const goTo = (path) => () => navigate(path);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow space-y-4 text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Logged in as <span className="font-semibold">{role}</span></p>

     
     
      
<button onClick={goTo("/evaluation-summary")} className="w-full bg-blue-500 text-white p-2 rounded">
  View Evaluation Summary
</button>

      {/* Participant only */}
      {role === "participant" && (
        <button onClick={goTo("/submission")} className="w-full bg-green-600 text-white p-2 rounded">
          Submit Your Project
        </button>
      )}

      {/* Judge only */}
      {role === "judge" && (
        <button onClick={goTo("/evaluation")} className="w-full bg-purple-600 text-white p-2 rounded">
          Evaluation Panel
        </button>
      )}

      {/* Admin only */}
      {role === "admin" && (
        <>
        
          <button onClick={goTo("/set-submission-window")} className="w-full bg-pink-600 text-white p-2 rounded">
            Set Submission Window
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
