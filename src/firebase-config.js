import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa9flJfXJbWO1qA9Y8QioJmYPn6tQLOwA",
  authDomain: "cm-habit-tracker.firebaseapp.com",
  projectId: "cm-habit-tracker",
  storageBucket: "cm-habit-tracker.firebasestorage.app",
  messagingSenderId: "261574109059",
  appId: "1:261574109059:web:58348b5d65bd1f9f59f8b6",
  measurementId: "G-L82QKED936",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
