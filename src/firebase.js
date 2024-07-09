import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA78sUHpxGWJ0y8p8HU7xj_4RBQiZIzy_8",
  authDomain: "project-todo-frontend.firebaseapp.com",
  projectId: "project-todo-frontend",
  storageBucket: "project-todo-frontend.appspot.com",
  messagingSenderId: "795131920155",
  appId: "1:795131920155:web:9f0642a3b90b3a36029dbe",
  measurementId: "G-1MKPEBF1G5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
