document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    fetchQuestions();
});

function initFirebase() {
    // Set up Firebase Auth State Observer
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('User is signed in:', user);
        } else {
            console.log('User is signed out');
        }
    });
}

async function fetchQuestions() {
    // Existing code to fetch questions

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        alert('Please sign in to submit the quiz.');
        return;
    }
}

async function submitQuiz() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    const submittedAnswers = {};

    formData.forEach((value, key) => {
        const questionIndex = key.substring(1);
        submittedAnswers[questionIndex] = value;
    });

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        alert('Please sign in to submit the quiz.');
        return;
    }

    // Store the submitted answers in Firebase Firestore
    await db.collection('quizSubmissions').add({
        userId: user.uid,
        answers: submittedAnswers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('Quiz submitted successfully!');
}
