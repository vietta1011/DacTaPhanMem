// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0S3PoG9Vnew8Qq9kLSJKAkpJxxI6pivU",
  authDomain: "trung-tam-ngoai-ngu-aac65.firebaseapp.com",
  projectId: "trung-tam-ngoai-ngu-aac65",
  storageBucket: "trung-tam-ngoai-ngu-aac65.firebasestorage.app",
  messagingSenderId: "896712386318",
  appId: "1:896712386318:web:5c4aad106575e6b52c995f",
  measurementId: "G-9ZNB31CSYW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Xuất db để sử dụng
export { db };
