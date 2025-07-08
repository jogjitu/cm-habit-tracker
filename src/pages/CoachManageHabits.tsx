import { useEffect, useState } from "react";
import axios from "axios";

export default function CoachManageHabits() {
  const [habits, setHabits] = useState<any[]>([]);
  const [habitName, setHabitName] = useState("");

  const fetchHabits = async () => {
    const res = await axios.get("/api/habits");
    setHabits(res.data);
  };

  const addHabit = async () => {
    if (!habitName) return;
    await axios.post("/api/habits", { name: habitName });
    setHabitName("");
    fetchHabits();
  };

  const deleteHabit = async (id: string) => {
    await axios.delete(`/api/habits/${id}`);
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Manage Habits</h1>

      <div className="flex space-x-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button
          onClick={addHabit}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {habits.map((h) => (
          <li
            key={h.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{h.name}</span>
            <button
              onClick={() => deleteHabit(h.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
