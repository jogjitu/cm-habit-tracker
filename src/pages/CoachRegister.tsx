import { useState } from "react";
import axios from "axios";

export default function CoachRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/coaches/register", { name, email });
      if (res.status === 201) {
        setMessage("✅ Coach registered successfully!");
      } else if (res.status === 409) {
        setMessage("⚠️ Coach already exists.");
      }
    } catch (err) {
      setMessage("❌ Error registering coach.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Coach Registration</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Register
        </button>
        {message && <div className="text-sm text-center text-gray-600 mt-2">{message}</div>}
      </form>
    </div>
  );
}
