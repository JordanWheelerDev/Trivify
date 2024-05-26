  // Global variables
  let currentQuestionIndex = 0;
  let currentCategoryIndex = 0;
  let timerInterval;
  let timeElapsed = 0;
  let correctAnswers = 0;
  let timerPaused = false;
  let triviaData;

  // DOM elements
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const timerElement = document.getElementById("timer");
  const backToCats = document.getElementById("backToCats");
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  // Event listener for back to categories button
  backToCats.addEventListener('click', () => {
      window.location.href = '../categories.html';
  });
  
  // Event listeners for category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      startQuiz(category);
    });
  });

  async function fetchQuestions() {
    try {
        const response = await fetch('js/questions.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
  
async function startQuiz(category) {
    // Fetch questions from JSON file
    triviaData = await fetchQuestions(); // Update this line to set the global triviaData

    // Filter trivia data based on the selected category
    const categoryData = triviaData.find(data => data.category === category);
    if (categoryData) {
        // Update the category title
        document.getElementById('categoryTitle').textContent = category + ' Trivia';
        // Start the quiz with trivia questions for the selected category
        currentQuestionIndex = 0;
        correctAnswers = 0;
        timeElapsed = 0;
        displayQuestion(categoryData.questions);
        startTimer();
    } else {
        Toastify({
            text: "Category not found",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #958fc5, #b0d7fe)",
            }
        }).showToast();
        localStorage.removeItem("selectedCategory");
        window.location.href = '../categories.html';
    }
}




  
  // Function to display trivia questions for a category
  function displayQuestion(questions) {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    // Shuffle the options array
    const shuffledOptions = currentQuestion.options.sort(() => Math.random() - 0.5);

    optionsContainer.innerHTML = "";
    shuffledOptions.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.classList.add("btn", "btn-secondary", "mx-1", "mb-3");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            checkAnswer(option, questions);
        });
        optionsContainer.appendChild(optionElement);
    });
}

  
  // Function to check answer and move to next question
  function checkAnswer(selectedOption, questions) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = optionsContainer.querySelectorAll("button");
    
      // Disable all buttons to prevent further selection
      options.forEach(option => {
        option.disabled = true;
      });
    
      if (selectedOption === currentQuestion.answer) {
        // Correct answer
        Toastify({
            text: "Correct!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #958fc5, #b0d7fe)",
            }
          }).showToast();
        correctAnswers++;
    
        // Change color of the selected button to green
        options.forEach(option => {
          if (option.textContent === selectedOption) {
            option.classList.remove("btn-secondary");
            option.classList.add("btn-success");
          }
        });
    
      } else {
        // Incorrect answer
        Toastify({
            text: "Incorrect!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #958fc5, #b0d7fe)",
            }
          }).showToast();
    
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
        if (currentQuestionIndex < questions.length) {
          displayQuestion(questions);
        } else {
          endQuiz(); // End the quiz when all questions are answered
        }
      }, 2000);
  }
  
  // Function to update timer
  function updateTimer() {
    if (!timerPaused) {
      timeElapsed++;
      timerElement.textContent = `${timeElapsed} seconds`;
    }
  }
  
  // Function to start timer
  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function endQuiz() {
    clearInterval(timerInterval);

    // Check if currentCategoryIndex is within bounds of triviaData array
    if (currentCategoryIndex >= 0 && currentCategoryIndex < triviaData.length) {
        const currentCategoryData = triviaData[currentCategoryIndex];

        if (currentCategoryData && currentCategoryData.questions) {
            // Calculate the total questions for the current category
            const totalQuestions = currentCategoryData.questions.length;

            // Calculate accuracy and time taken for the current category
            const accuracy = correctAnswers / totalQuestions;
            const timeTaken = timeElapsed;

            Toastify({
                text: `Quiz finished!\nAccuracy: ${correctAnswers}/${totalQuestions}\nTime taken: ${timeTaken} seconds\nRedirecting back to categories in 5 seconds`,
                duration: 5000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #958fc5, #b0d7fe)",
                }
            }).showToast();
        } else {
            Toastify({
                text: `No questions found for the selected category`,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #958fc5, #b0d7fe)",
                }
            }).showToast();
        }
    } else {
        // Handle the case where currentCategoryIndex is out of bounds
        Toastify({
            text: `Invalid category index`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #958fc5, #b0d7fe)",
            }
        }).showToast();
    }

    // Delay for 5 seconds, then remove selected category from localStorage and redirect
    setTimeout(() => {
        const selectedCategory = localStorage.getItem("selectedCategory");
        if (selectedCategory) {
            localStorage.removeItem("selectedCategory");
        }
        window.location.href = '../categories.html';
    }, 5000);
}
