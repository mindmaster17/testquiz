// Define your API endpoint
const apiUrl = "https://opentdb.com/api.php?amount=5&type=multiple"; // Change the number of questions as needed

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionContainer = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

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
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = question.question;
    optionsContainer.innerHTML = "";

    const answers = [...question.incorrect_answers, question.correct_answer];
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
    score++;
  }
  currentQuestionIndex++;
  displayQuestion();
}

function finishQuiz() {
  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";
  nextButton.style.display = "none";
  scoreText.textContent = score;
  scoreContainer.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  displayQuestion();
});

fetchQuestions();
