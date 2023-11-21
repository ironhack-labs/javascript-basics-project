class Quiz {
  constructor(questions, description, timeLimit) {
    this.questions = questions;
    this.description = description;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  filterQuestionsByDifficulty(difficulty) {
    const filteredQuestions = this.questions.filter((question) => {
      return question.difficulty === difficulty;
    });

    this.questions = filteredQuestions;
    return this.questions;
  }

  shuffleQuestions() {
    if (!this.questions || !this.questions.length) {
      return undefined;
    };

    const shuffledQuestions = [];
    let last = this.questions.length;

    while (last > 0) {
      last--;
      const randomIndex = Math.floor(Math.random() * last);
      const randomQuestion = this.questions[randomIndex];
      shuffledQuestions.push(randomQuestion);
      this.questions.splice(randomIndex, 1);
    }

    this.questions = shuffledQuestions;
    return this.questions;
  }

  guess(answer) {
    const question = this.getQuestion();
    const isCorrectAnswer = question.answer === answer;

    if (isCorrectAnswer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }
}
