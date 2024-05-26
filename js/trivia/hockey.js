const hockeyTriviaData = [
    {
        question: 'Which coach took the Chicago Blackhawks to the Stanley Cup Final in 1992?',
        options: ["John Tortorella", "Jon Cooper", "Mike Babcock", "Mike Keenan"],
        answer: 'Mike Keenan'
    },
    {
        question: 'Which Team Is Often Referred To As The \'Habs\'?',
        options: ["Anaheim Ducks", "Tampa Bay Lightning", "Montreal Canadians", "Florida Panthers"],
        answer: 'Montreal Canadians'
    }
]

let currentQuestionIndex = 0;
let timerInterval;
let timeElapsed = 0; // Time elapsed in seconds
let correctAnswers = 0;
let timerPaused = false;

const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const backToCats = document.getElementById("backToCats");

backToCats.addEventListener('click', () => {
    window.location.href = '../categories.html';
});

function displayQuestion(questionIndex) {
  const currentQuestion = hockeyTriviaData[questionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.classList.add("btn", "btn-secondary", "mx-1", "mb-3");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => {
      checkAnswer(option);
    });
    optionsContainer.appendChild(optionElement);
  });
}

function checkAnswer(selectedOption) {
    const currentQuestion = hockeyTriviaData[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll("button");
  
    // Disable all buttons to prevent further selection
    options.forEach(option => {
      option.disabled = true;
    });
  
    if (selectedOption === currentQuestion.answer) {
      // Correct answer
      alert("Correct!");
      correctAnswers++; // Increment correct answer count
  
      // Change color of the selected button to green
      options.forEach(option => {
        if (option.textContent === selectedOption) {
          option.classList.remove("btn-secondary");
          option.classList.add("btn-success");
        }
      });
  
    } else {
      // Incorrect answer
      alert("Incorrect!");
  
      // Change color of the selected button to red
      options.forEach(option => {
        if (option.textContent === selectedOption) {
          option.classList.remove("btn-secondary");
          option.classList.add("btn-danger");
        }
      });
  
      // Highlight the correct answer by changing its color to green
      options.forEach(option => {
        if (option.textContent === currentQuestion.answer) {
          option.classList.remove("btn-secondary");
          option.classList.add("btn-success");
        }
      });
    }
  
    // Pause the timer during the delay
    timerPaused = true;
    setTimeout(() => {
      timerPaused = false;
      currentQuestionIndex++;
      if (currentQuestionIndex < hockeyTriviaData.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        endQuiz(); // End the quiz when all questions are answered
      }
    }, 2000);
  }
  
  function updateTimer() {
    if (!timerPaused) {
      timeElapsed++;
      timerElement.textContent = `${timeElapsed} seconds`;
    }
  }

function endQuiz() {
    clearInterval(timerInterval);
    const totalQuestions = hockeyTriviaData.length;
    const accuracy = correctAnswers / totalQuestions;
    const timeTaken = timeElapsed;
  
    alert(`Quiz finished!\nAccuracy: ${correctAnswers}/${totalQuestions}\nTime taken: ${timeTaken} seconds`);
  }

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Start the game
displayQuestion(currentQuestionIndex);
startTimer();

nextButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timeElapsed = 0; // Reset timer
  startTimer();
  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
});