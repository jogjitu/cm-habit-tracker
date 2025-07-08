import { useEffect, useState } from "react";
import axios from "axios";

export default function CoachManageStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get("/api/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!name || !phone) return;

    const uid = `manual-${Date.now()}`;
    await axios.post("/api/students/register", { uid, name, phone });
    setName("");
    setPhone("");
    fetchStudents();
  };

  const deleteStudent = async (uid: string) => {
    await axios.delete(`/api/students/${uid}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>

      <div className="flex space-x-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={addStudent}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {students.map((s) => (
          <li
            key={s.uid}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <strong>{s.name}</strong> – {s.phone}
            </div>
            <button
              onClick={() => deleteStudent(s.uid)}
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
