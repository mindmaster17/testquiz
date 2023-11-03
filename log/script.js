const apiUrl = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

fetch(apiUrl)
 .then((response) => response.json())
 .then((data) => {
    startQuiz(data.results);
 });

function startQuiz(questions) {
 let questionIndex = 0;

 const form = document.getElementById("quizForm");
 const questionEl = document.getElementById("question");
 const optionsEl = document.getElementById("options");

 form.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedOption = optionsEl.querySelector("input[type='radio']:checked");

    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    let correct = selectedOption.value === "true";
    questionIndex++;

    if (questionIndex < questions.length) {
      askQuestion(questions[questionIndex]);
    } else {
      showResults(correct);
    }
 });

 function askQuestion(question) {
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";

    question.incorrect_answers.push(question.correct_answer);
    question.incorrect_answers.sort();

    question.incorrect_answers.forEach((answer, index) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = index === question.correct_answer.length;
      optionsEl.appendChild(input);

      const label = document.createElement("label");
      label.textContent = answer;
      optionsEl.appendChild(label);

      optionsEl.appendChild(document.createElement("br"));
    });
 }

 askQuestion(questions[questionIndex]);
}

function showResults(correct) {
 const form = document.getElementById("quizForm");
 const results = document.createElement("h2");
 results.textContent = correct ? "Congratulations! You're right!" : "Oops! Better luck next time.";
 form.appendChild(results);
}
