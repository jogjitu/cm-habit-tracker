// src/pages/StudentHabits.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Habit {
  id: string;
  name: string;
  completedToday?: boolean;
}

export default function StudentHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const uid = localStorage.getItem("studentUid");

  useEffect(() => {
    if (!uid) {
      alert("Student not logged in");
      return;
    }
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get(`/student/${uid}/habits`);
      setHabits(res.data);
    } catch (error) {
      console.error("Error fetching student habits:", error);
    }
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completedToday: !h.completedToday } : h
      )
    );
  };

  const submitToday = async () => {
    try {
      const completedHabits = habits
        .filter((h) => h.completedToday)
        .map((h) => h.id);

      await api.post(`/student/${uid}/habits/mark`, {
        habitsDone: completedHabits,
      });

      alert("Habits submitted for today!");
    } catch (error) {
      console.error("Error submitting habits:", error);
      alert("Failed to submit habits");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Today’s Habits</h2>

      {habits.length === 0 ? (
        <p>No habits assigned.</p>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center gap-4 border p-2 rounded">
              <input
                type="checkbox"
                checked={habit.completedToday || false}
                onChange={() => toggleHabit(habit.id)}
              />
              <span>{habit.name}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={submitToday}
        disabled={loading}
      >
        Submit
      </button>
    </div>
  );
}
