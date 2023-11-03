let quiz = [];
let score = 0;
let currentQuestion = 0;

function getQuiz() {
    fetch('https://opentdb.com/api.php?amount=10&category=18
