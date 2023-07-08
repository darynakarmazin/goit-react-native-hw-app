// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqbfG6JvnhI5n73gwFqBj_wSvfzq6lhjU",
  authDomain: "goit-react-native-hw-app.firebaseapp.com",
  databaseURL: "https://goit-react-native-hw-app-default-rtdb.firebaseio.com",
  projectId: "goit-react-native-hw-app",
  storageBucket: "goit-react-native-hw-app.appspot.com",
  messagingSenderId: "739779105588",
  appId: "1:739779105588:web:56b9a72592f54bbbea0b61",
  measurementId: "G-BLWNW03FJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
