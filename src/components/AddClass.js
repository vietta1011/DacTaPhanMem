import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import "./AddClass.css"; // Import file CSS

const AddClass = () => {
  const [tenLop, setTenLop] = useState("");
  const [maKhoaHoc, setMaKhoaHoc] = useState("");
  const [maPhongHoc, setMaPhongHoc] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [khoas, setKhoas] = useState([]);
  const [phongs, setPhongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const khoaSnap = await getDocs(collection(db, "khoa"));
      setKhoas(khoaSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const phongSnap = await getDocs(collection(db, "phong"));
      setPhongs(phongSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(ngayBatDau) > new Date(ngayKetThuc)) {
      alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      return;
    }
    await addDoc(collection(db, "lop"), {
      tenLop,
      maKhoaHoc,
      maPhongHoc,
      ngayBatDau,
      ngayKetThuc,
    });
    alert("Lớp học được thêm thành công!");
    setTenLop("");
    setMaKhoaHoc("");
    setMaPhongHoc("");
    setNgayBatDau("");
    setNgayKetThuc("");
    navigate("/classes");
  };

  return (
    <div className="add-class-container">
      <h1>Thêm lớp học mới</h1>
      <form onSubmit={handleSubmit} className="add-class-form">
        <label>
          Tên lớp
          <input
            type="text"
            placeholder="Tên lớp"
            value={tenLop}
            onChange={(e) => setTenLop(e.target.value)}
            required
          />
        </label>
        <label>
          Khóa học
          <select
            value={maKhoaHoc}
            onChange={(e) => setMaKhoaHoc(e.target.value)}
            required
          >
            <option value="">Chọn khóa học</option>
            {khoas.map((khoa) => (
              <option key={khoa.id} value={khoa.id}>
                {khoa.tenKhoaHoc}
              </option>
            ))}
          </select>
        </label>
        <label>
          Phòng học
          <select
            value={maPhongHoc}
            onChange={(e) => setMaPhongHoc(e.target.value)}
            required
          >
            <option value="">Chọn phòng học</option>
            {phongs.map((phong) => (
              <option key={phong.id} value={phong.id}>
                {phong.tenPhong}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ngày bắt đầu
          <input
            type="date"
            value={ngayBatDau}
            onChange={(e) => setNgayBatDau(e.target.value)}
            required
          />
        </label>
        <label>
          Ngày kết thúc
          <input
            type="date"
            value={ngayKetThuc}
            onChange={(e) => setNgayKetThuc(e.target.value)}
            required
          />
        </label>
        <button type="submit">Thêm lớp học</button>
      </form>
    </div>
  );
};

export default AddClass;
