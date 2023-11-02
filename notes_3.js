11.02 11:19 PM
js
let currentQuestion = 1;
let score = 0;

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="q' + currentQuestion + '"]:checked');

    if (selectedOption) {
        // Replace 'correct_answer' with the actual correct answer for each question
        if (selectedOption.value === 'a') {
            score++;
        }

        currentQuestion++;
        if (currentQuestion <= 10) {
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    } else {
        alert('Please select an option.');
    }
}

function showQuestion(questionNumber) {
    document.getElementById('quiz').innerHTML = `
        <h2>Question ${questionNumber}</h2>
        <form id="questionForm">
            <label>
                <input type="radio" name="q${questionNumber}" value="a"> The Sun is made of gas.
            </label>
            <label>
                <input type="radio" name="q${questionNumber}" value="b"> The Sun is solid.
            </label>
            <label>
                <input type="radio" name="q${questionNumber}" value="c"> The Sun is a giant planet.
            </label>
            <label>
                <input type="radio" name="q${questionNumber}" value="d"> The Sun is made of ice.
            </label>
            <button type="button" onclick="nextQuestion()">Next</button>
        </form>
    `;
}

function showResult() {
    const resultSection = document.getElementById('result');
    const resultScore = document.getElementById('resultScore');

    resultScore.textContent = score + ' out of 10';
    resultSection.style.display = 'block';
}

