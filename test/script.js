const apiUrl = "https://opentdb.com/api.php?amount=5&type=multiple"; // Change the number of questions as needed
let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results;
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionText = document.getElementById("question-text");
    questionText.textContent = questions[currentQuestionIndex].question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    const answers = [
      ...questions[currentQuestionIndex].incorrect_answers,
      questions[currentQuestionIndex].correct_answer,
    ];

    // Shuffle the answer options
    answers.sort(() => Math.random() - 0.5);

    answers.forEach((answer) => {
      const option = document.createElement("div");
      option.className = "option";
      option.textContent = answer;
      option.onclick = () => checkAnswer(answer);
      optionsContainer.appendChild(option);
    });
  } else {
    finishQuiz();
  }
}

function checkAnswer(answer) {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;
  if (answer === correctAnswer) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.innerHTML = `<h1>Quiz Completed!</h1><p>You've answered ${currentQuestionIndex} out of ${questions.length} questions correctly.</p>`;
}

function loadNextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

window.onload = fetchQuestions;
