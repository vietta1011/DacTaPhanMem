import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CourseList from "./components/CourseList";
import AddCourse from "./components/AddCourse";
import ClassList from "./components/ClassList";
import AddClass from "./components/AddClass";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="nav-container">
          <ul className="nav-links">
            <li>
              <Link to="/">Danh sách khóa học</Link>
            </li>
            <li>
              <Link to="/add-course">Thêm khóa học</Link>
            </li>
            <li>
              <Link to="/classes">Danh sách lớp học</Link>
            </li>
            <li>
              <Link to="/add-class">Thêm lớp học</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/add-class" element={<AddClass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
