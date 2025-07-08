import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CoachLogin() {
  const [email, setEmail] = useState("");
  const [coach, setCoach] = useState<any>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/coaches/login", { email });
      setCoach(res.data.coach);
      setMessage("✅ Login successful.");
      localStorage.setItem("coach", JSON.stringify({ ...res.data.coach, uid: res.data.uid }));
      navigate("/coach/dashboard");
    } catch (err: any) {
      if (err.response?.status === 404) {
        setMessage("❌ Coach not found.");
      } else {
        setMessage("❌ Login failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Coach Login</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Login
        </button>
        {message && <div className="text-sm text-center text-gray-600 mt-2">{message}</div>}
        {coach && (
          <div className="text-sm text-center text-green-700 mt-4">
            Welcome, <strong>{coach.name}</strong>
          </div>
        )}
      </form>
    </div>
  );
}
