import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./ClassList.css"; // Import file CSS

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const snapshot = await getDocs(collection(db, "lop"));
      const classData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const classInfo = docSnap.data();
          const khoa = await getDoc(doc(db, "khoa", classInfo.maKhoaHoc));
          const phong = await getDoc(doc(db, "phong", classInfo.maPhongHoc));

          return {
            id: docSnap.id,
            ...classInfo,
            tenKhoaHoc: khoa.data()?.tenKhoaHoc || "Không xác định",
            tenPhong: phong.data()?.tenPhong || "Không xác định",
          };
        })
      );

      setClasses(classData);
    };

    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa lớp học này?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "lop", id));
      setClasses(classes.filter((classItem) => classItem.id !== id));
    }
  };

  return (
    <div className="class-list-container">
      <h1>Danh sách lớp học</h1>
      <table className="class-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Lớp</th>
            <th>Khóa Học</th>
            <th>Phòng Học</th>
            <th>Ngày Bắt Đầu</th>
            <th>Ngày Kết Thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={classItem.id}>
              <td>{index + 1}</td>
              <td>{classItem.tenLop}</td>
              <td>{classItem.tenKhoaHoc}</td>
              <td>{classItem.tenPhong}</td>
              <td>{classItem.ngayBatDau || "Không xác định"}</td>
              <td>{classItem.ngayKetThuc || "Không xác định"}</td>
              <td className="action">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(classItem.id)}
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

export default ClassList;
