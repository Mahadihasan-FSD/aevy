import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5C8tZEJOhzgZgy71rbJOreAICLgE4zB8",
  authDomain: "aevy-584f8.firebaseapp.com",
  databaseURL: "https://aevy-584f8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aevy-584f8",
  storageBucket: "aevy-584f8.firebasestorage.app",
  messagingSenderId: "350971075726",
  appId: "1:350971075726:web:a46044662b85d45cf77ddf",
  measurementId: "G-X4Q8LZJK8B"
};
// Initialize or get existing app
let app;
try {
  app = getApp(); // Try to get existing app
} catch {
  app = initializeApp(firebaseConfig); // Create new if doesn't exist
}

const db = getFirestore(app);
export { db };