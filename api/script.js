// Get the value of 'questions' parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const urlFab = urlParams.get('questions');

// Use the prompt if the URL parameter is not present
let fab = urlFab || prompt("How Many Questions Do You Want?"); // Default to 5 if neither the URL parameter nor prompt is provided


const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const geography = 22;

let correctAnswer = "",
    correctScore = askedCount = 0,
    totalQuestion = fab;

// load question from API
async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easyhttps://opentdb.com/api.php?amount=10&category=22&difficulty=easy';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

// event listeners
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});


// display question and options
function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // document.write(correctAnswer);


    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}


// options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// answer checking
function checkAnswer(answer) {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;
  const optionsContainer = document.getElementById("options-container");

  if (answer === correctAnswer) {
    // Display the correct answer for 2 seconds (2000 milliseconds)
    optionsContainer.innerHTML = `<div class="option correct">${correctAnswer}</div>`;
    setTimeout(() => {
      currentQuestionIndex++;
      displayQuestion();
    }, 2000);
  } else {
    // Display the correct answer for 2 seconds (2000 milliseconds)
    const correctOption = Array.from(optionsContainer.children).find(option => option.textContent === correctAnswer);
    correctOption.classList.add("correct");
    setTimeout(() => {
      finishQuiz();
    }, 5000);
  }
}


// to convert html entities into normal text of correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}


function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}


function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}
