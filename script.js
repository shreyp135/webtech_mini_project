const quizDiv = document.getElementById("quiz");

function loadQuiz() {
  questions.forEach((q, index) => {
    let div = document.createElement("div");
    div.classList.add("question");

    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
    `;

    quizDiv.appendChild(div);
  });
}

loadQuiz();

let timeLeft = 60;
const timer = document.getElementById("time");

const countdown = setInterval(() => {
  timeLeft--;
  timer.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    submitQuiz();
  }
}, 1000);


function submitQuiz() {
  clearInterval(countdown);

  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").innerHTML =
    `You scored ${score} / ${questions.length}`;
}
