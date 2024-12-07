import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "khoa"));
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "khoa", id));
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="course-list-container">
      <h1>Danh sách khóa học</h1>
      <table className="course-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Khóa Học</th>
            <th>Mô Tả Khóa Học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>{course.tenKhoaHoc}</td>
              <td>{course.moTaKhoaHoc}</td>
              <td className="action">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(course.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
