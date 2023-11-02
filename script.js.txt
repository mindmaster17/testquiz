document.getElementById("quiz-form").onsubmit = function(event) {
  event.preventDefault();

  const answers = ["paris", "mars", "4"];
  const form = event.target;
  const score = Array.from(form.elements)
    .filter(e => e.type === "radio" && e.checked)
    .map(e => e.value);

  if (score.length === answers.length && score.every((val, index) => val === answers[index])) {
    document.getElementById("result").textContent = "Congratulations! You got all the answers right!";
  } else {
    document.getElementById("result").textContent = "Sorry, you didn't get all the answers right. Try again!";
  }
};
