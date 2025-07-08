import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to Habit Tracker</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/student/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          I'm a Student
        </button>
        <button
          onClick={() => navigate("/coach/login")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          I'm a Coach
        </button>
      </div>
    </div>
  );
}
