import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import CoachRegister from "./pages/CoachRegister";
import CoachLogin from "./pages/CoachLogin";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import CoachDashboard from "./pages/CoachDashboard";
import CoachManageStudents from "./pages/CoachManageStudents";
import CoachManageHabits from "./pages/CoachManageHabits";
import CoachHabits from "./pages/CoachHabits";
import StudentHabits from "./pages/StudentHabits";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/register" element={<Register />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/coach/register" element={<CoachRegister />} />
        <Route path="/coach/login" element={<CoachLogin />} />
        <Route path="/coach/dashboard" element={<CoachDashboard />} />
        <Route path="/coach/students" element={<CoachManageStudents />} />
        <Route path="/coach/habits" element={<CoachManageHabits />} />
        <Route path="/coach/habits" element={<CoachHabits />} />
        <Route path="/student/habits" element={<StudentHabits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
