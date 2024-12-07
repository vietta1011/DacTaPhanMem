import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import "./AddCourse.css"; // Import file CSS

const AddCourse = () => {
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [moTaKhoaHoc, setMoTaKhoaHoc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "khoa"), { tenKhoaHoc, moTaKhoaHoc });
    alert("Khóa học được thêm thành công!");
    setTenKhoaHoc("");
    setMoTaKhoaHoc("");
    navigate("/");
  };

  return (
    <div className="add-course-container">
      <h1>Thêm khóa học mới</h1>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="tenKhoaHoc">Tên khóa học</label>
          <input
            id="tenKhoaHoc"
            type="text"
            placeholder="Tên khóa học"
            value={tenKhoaHoc}
            onChange={(e) => setTenKhoaHoc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="moTaKhoaHoc">Mô tả khóa học</label>
          <textarea
            id="moTaKhoaHoc"
            placeholder="Mô tả khóa học"
            value={moTaKhoaHoc}
            onChange={(e) => setMoTaKhoaHoc(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Thêm khóa học
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
