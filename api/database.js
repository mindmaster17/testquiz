import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

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
