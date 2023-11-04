let quizData;
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex;

function startQuiz() {
 fetch('https://opentdb.com/api.php?amount=10&category=22&type=multiple')
    .then(response => response.json())
    .then(data => {
      quizData = data.results;
      showQuestion();
    });
}

function showQuestion() {
 const questionContainer = document.querySelector('.question-container');
 const nextButton = document.querySelector('.next-button');

 questionContainer.innerHTML = '';

 const question = quizData[currentQuestionIndex].question;
 const options = quizData[currentQuestionIndex].incorrect_answers;
 options.push(quizData[currentQuestionIndex].correct_answer);

 questionContainer.innerHTML += `
    <h3>${question}</h3>
    <form>
      ${options.map((option, index) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answer" value="${index}">
          <label class="form-check-label">
            ${option}
          </label>
        </div>
      `).join('')}
    </form>
 `;

 nextButton.addEventListener('click', () => {
    selectedOptionIndex = document.querySelector('input[name="answer"]:checked').value;

    if (options[selectedOptionIndex] === quizData[currentQuestionIndex].correct_answer) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      displayScore();
    }
  });
}

function displayScore() {
  const scoreContainer = document.querySelector('.score-container');
  scoreContainer.style.display = 'block';
  document.querySelector('.score').textContent = score;
}

startQuiz();
