// src/pages/CoachHabits.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Habit {
  id: string;
  name: string;
}

export default function CoachHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitName, setHabitName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHabits = async () => {
    const res = await api.get("/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    if (!habitName) return;
    setLoading(true);
    try {
      await api.post("/habit", { name: habitName });
      setHabitName("");
      fetchHabits();
    } catch (error) {
      console.error("Failed to add habit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      await api.delete(`/habit/${id}`);
      fetchHabits();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Habits</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="New habit name"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleAddHabit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>{habit.name}</span>
            <button
              onClick={() => handleDeleteHabit(habit.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
