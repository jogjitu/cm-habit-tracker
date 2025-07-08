import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CoachDashboard() {
  const [coach, setCoach] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("coach");
    if (stored) {
      setCoach(JSON.parse(stored));
    } else {
      navigate("/coach/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("coach");
    navigate("/coach/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Coach Dashboard</h1>
      {coach && (
        <div className="text-gray-700">Welcome, <strong>{coach.name}</strong></div>
      )}

      <div className="space-x-4">
        <button
          onClick={() => navigate("/coach/students")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Manage Students
        </button>
        <button
          onClick={() => navigate("/coach/habits")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Manage Habits
        </button>
        <button
          onClick={() => navigate("/coach/reports")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View Reports
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 text-red-600 underline hover:text-red-800"
      >
        Logout
      </button>
    </div>
  );
}
