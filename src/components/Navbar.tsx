import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons from lucide-react

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold">Habit Tracker</div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/student/register" className="hover:underline">Student Register</Link>
          <Link to="/coach/register" className="hover:underline">Coach Register</Link>
          <Link to="/coach/login" className="hover:underline">Coach Login</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link to="/student/register" className="block hover:underline" onClick={() => setOpen(false)}>Student Register</Link>
          <Link to="/coach/register" className="block hover:underline" onClick={() => setOpen(false)}>Coach Register</Link>
          <Link to="/coach/login" className="block hover:underline" onClick={() => setOpen(false)}>Coach Login</Link>
          <Link to="/student/login" className="hover:underline">Student Login</Link>

        </div>
      )}
    </nav>
  );
}
