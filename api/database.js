// Import the functions you need from the SDKs you need
	  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
	  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
	  import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
	  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

	  // TODO: Add SDKs for Firebase products that you want to use
	  // https://firebase.google.com/docs/web/setup#available-libraries getDatabase

	  // Your web app's Firebase configuration
	  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
	  const firebaseConfig = {
    	  apiKey: "AIzaSyCkNJFimfRBFgwiFRCNDtTPlo8g-2JIc-M",
   	  authDomain: "login-page-c3c64.firebaseapp.com",
   	  databaseURL: "https://login-page-c3c64-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "login-page-c3c64",
          storageBucket: "login-page-c3c64.appspot.com",
          messagingSenderId: "426921518510",
          appId: "1:426921518510:web:98a3252f91b0fdeaa5943f",
          measurementId: "G-SKKHTLF0BH"
	  };

	  // Initialize Firebase
	  const app = initializeApp(firebaseConfig);
	  const analytics = getAnalytics(app);
	  const auth = getAuth();
 	  const provider = new GoogleAuthProvider()
	  console.log(app);
    const db = getDatabase();

// Function to add a score to a user
const addScoreToUser = (userId, score) => {
  const userRef = ref(db, 'users/' + userId);

  // Retrieve current user data
  get(userRef)
    .then((snapshot) => {
      const userData = snapshot.val();

      // Check if user data exists
      if (userData) {
        // If the user has a 'scores' property, update it; otherwise, create it
        if (userData.scores) {
          userData.scores.push(score);
        } else {
          userData.scores = [score];
        }

        // Update the user data in the database
        set(userRef, userData)
          .then(() => {
            console.log(`Score ${score} added to user ${userId}`);
          })
          .catch((error) => {
            console.error("Error updating user data:", error);
          });
      } else {
        console.error(`User with ID ${userId} not found`);
      }
    })
    .catch((error) => {
      console.error("Error retrieving user data:", error);
    });
};

// Example usage:
const userId = "user123"; // Replace with the actual user ID
const scoreToAdd = 100; // Replace with the actual score
addScoreToUser(userId, scoreToAdd);
