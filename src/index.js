document.addEventListener("DOMContentLoaded", () => {
  const startView = document.getElementById("startView");
  const quizView = document.getElementById("quizView");
  const endView = document.getElementById("endView");
  const resultContainer = document.getElementById("result");
  const quizDescription = document.getElementById("quizDescription");
  const startQuestionsCount = document.getElementById("startQuestionsCount");
  const startButton = document.getElementById("startButton");
  const nextButton = document.getElementById("nextButton");
  const restartButton = document.getElementById("restartButton");

  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", "easy"),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", "medium"),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", "hard")
    // Add more questions here
  ];
  const description = "A short quiz with mixed questions about everything.";
  const timeLimit = 120; // 120 seconds (2 minutes)
  let timer;

  const quiz = new Quiz(questions, description, timeLimit);
  quiz.shuffleQuestions();
  
  quizDescription.innerText = quiz.description;
  startQuestionsCount.innerText = `Total Questions: ${quiz.questions.length}`;
  
  startButton.addEventListener("click", function () {
    startView.style.display = "none";
    quizView.style.display = "block";
    const timeRemainingContainer = document.getElementById("timeRemaining");

    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    timeRemainingContainer.innerText = `${minutes}:${seconds}`;    
    timer = setInterval(() => {
      quiz.timeRemaining--;
      // Convert seconds to minutes and seconds
      // Pad the minutes and seconds with leading zeros if needed
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }
    , 1000);
  
      
    showNextQuestion();
  });

  nextButton.addEventListener("click", function () {
    const choices = document.getElementsByName("choice");
    let selectedAnswer;

    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.guess(selectedAnswer);
      quiz.moveToNextQuestion();
      showNextQuestion();
    }
  });

  restartButton.addEventListener("click", function () {
      quiz.currentQuestionIndex = 0;
      quiz.correctAnswers = 0;
      quiz.timeRemaining = quiz.timeLimit;

      endView.style.display = "none";
      startView.style.display = "block";
    });

  function showNextQuestion() {
    if (quiz.hasEnded()) {
      clearInterval(timer);
      showResults();
    } else {
      const choiceContainer = document.getElementById("choices");
      const questionContainer = document.getElementById("question");
      const progressBar = document.getElementById("progressBar");
      const questionTitle = document.getElementById("questionTitle");

      let question = quiz.getQuestion(quiz.currentQuestionIndex);
      question.shuffleChoices();
      
      questionContainer.innerText = question.text;

      // Update progress bar width
      const progressPercentage =
        (quiz.currentQuestionIndex / quiz.questions.length) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      // Update question title
      let questionTitleText = `Question ${quiz.currentQuestionIndex + 1} of ${
        quiz.questions.length
      }`;
      questionTitle.innerText = questionTitleText;

      choiceContainer.innerHTML = "";

      question.choices.forEach((choice) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        radio.value = choice;
        choiceContainer.appendChild(radio);

        const label = document.createElement("label");
        label.innerText = choice;
        choiceContainer.appendChild(label);

        const br = document.createElement("br");
        choiceContainer.appendChild(br);
      });
    }
  }

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }
});
