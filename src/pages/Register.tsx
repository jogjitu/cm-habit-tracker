import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!name || !phone || phone.length !== 10) {
      setStatus("Please enter valid name and 10-digit phone number.");
      return;
    }

    try {
      const uid = phone; // use phone as uid for now
      await axios.post("http://localhost:4000/api/students/register", {
        uid,
        name,
        phone,
      });
      setStatus("✅ Successfully registered!");
      setName("");
      setPhone("");
    } catch (err: any) {
      setStatus("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default Register;
