describe("Quiz", () => {
  describe("class", () => {
    it("should be defined", () => {
      expect(Quiz).toBeDefined();
    });

    it("should receive 3 arguments", () => {
      expect(Quiz.length).toEqual(3);
    });

    it("should receive 'questions' array as its 1st argument", () => {
      const testQuestions = ["question1", "question2", "question3"];

      const quiz = new Quiz(testQuestions, "test", 60);
      expect(quiz.questions).toEqual(testQuestions);
    });

    it("should receive 'description' string as its 2nd argument", () => {
      const testDescription = "This is a test quiz";
      const quiz = new Quiz([], testDescription, 60);
      expect(quiz.description).toEqual(testDescription);
    });

    it("should receive 'timeLimit' integer as its 3rd argument", () => {
      const testTimeLimit = 60;
      const quiz = new Quiz([], "test", testTimeLimit);
      expect(quiz.timeLimit).toEqual(testTimeLimit);
    });

    it("should have a 'timeRemaining' property initially set to the same value as 'timeLimit'", () => {
      const testTimeLimit = 60;
      const quiz = new Quiz([], "test", testTimeLimit);
      expect(quiz.timeLimit).toEqual(testTimeLimit);
      expect(quiz.timeRemaining).toEqual(testTimeLimit);
    });

    it("should have a 'correctAnswers' property initially set to 0", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.correctAnswers).toEqual(0);
    });

    it("should have a 'currentQuestionIndex' property initially set to 0", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.currentQuestionIndex).toEqual(0);
    });
  });

  describe("getQuestion() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.getQuestion).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], "test", 60);
      expect(typeof quiz.getQuestion).toBe("function");
    });

    it("should return the item from the 'questions' array at the position of 'currentQuestionIndex'", () => {
      const testQuestions = ["question1", "question2", "question3"];

      const quiz1 = new Quiz(testQuestions, "test quiz 1", 60);
      expect(quiz1.getQuestion()).toEqual("question1");

      const quiz2 = new Quiz(testQuestions, "test quiz 2", 60);
      quiz2.currentQuestionIndex = 2;
      expect(quiz2.getQuestion()).toEqual("question3");
    });
  });

  describe("moveToNextQuestion() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.moveToNextQuestion).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], "test", 60);
      expect(typeof quiz.moveToNextQuestion).toBe("function");
    });

    it("should increment the 'currentQuestionIndex' by 1", () => {
      const quiz = new Quiz(["a", "b", "c"], "test", 60);
      quiz.moveToNextQuestion();
      expect(quiz.currentQuestionIndex).toEqual(1);
    });
  });

  describe("filterQuestionsByDifficulty() method", () => {
    it("should be defined", () => {});

    it("should be a function", () => {});

    it("should receive 1 argument", () => {});

    it("should receive 'difficulty' string as its 1st argument", () => {

    });

    it("should filter the 'questions' array items by 'difficulty'", () => {
      const testQuestions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: "easy" },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "e", difficulty: "medium" },
        { text: "Question 3", choices: ["x", "y", "z"], answer: "z", difficulty: "hard" },
        { text: "Question 4", choices: ["4", "5", "6"], answer: "5", difficulty: "medium" },
        { text: "Question 5", choices: ["7", "8", "9"], answer: "9", difficulty: "hard" },
        { text: "Question 6", choices: ["1", "2", "3"], answer: "1", difficulty: "easy" }
      ];

      const quiz = new Quiz(testQuestions, "test", 60);
      quiz.filterQuestionsByDifficulty("easy");
      expect(quiz.questions).toEqual([
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a", difficulty: "easy" },
        { text: "Question 6", choices: ["1", "2", "3"], answer: "1", difficulty: "easy" }
      ]);

      quiz.filterQuestionsByDifficulty("medium");
      expect(quiz.questions).toEqual([
        { text: "Question 2", choices: ["d", "e", "f"], answer: "e", difficulty: "medium" },
        { text: "Question 4", choices: ["4", "5", "6"], answer: "5", difficulty: "medium" }
      ]);

      quiz.filterQuestionsByDifficulty("hard");
      expect(quiz.questions).toEqual([
        { text: "Question 3", choices: ["x", "y", "z"], answer: "z", difficulty: "hard" },
        { text: "Question 5", choices: ["7", "8", "9"], answer: "9", difficulty: "hard" }
      ]);
    });
    
  });

  describe("shuffleQuestions() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.shuffleQuestions).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], "test", 60);
      expect(typeof quiz.shuffleQuestions).toBe("function");
    });

    it("should return undefined if 'questions' array is empty", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.shuffleQuestions()).toBeUndefined();
    });

    it("should return undefined if 'questions' array is not defined", () => {
      const quiz = new Quiz(undefined, "test", 60);
      expect(quiz.shuffleQuestions()).toBeUndefined();
    });

    it("should shuffle the items in the 'questions' array", () => {
      const testQuestions = ["question1", "question2", "question3"];
      const quiz = new Quiz(testQuestions, "test", 60);
      quiz.shuffleQuestions();
      expect(quiz.questions).not.toEqual(testQuestions);
    });
  });

  describe("guess() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.guess).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], "test", 60);
      expect(typeof quiz.guess).toBe("function");
    });

    it("should receive 1 argument", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.guess.length).toEqual(1);
    });

    it("should increase 'correctAnswers' by 1 when guessing a correct answer", () => {
      const testQuestions = [
        { text: "Question 1", choices: ["a", "b", "c"], answer: "a" },
        { text: "Question 2", choices: ["d", "e", "f"], answer: "e" },
        { text: "Question 3", choices: ["x", "y", "z"], answer: "z" },
      ];

      const quiz = new Quiz(testQuestions, "test", 60);
      quiz.guess("a");
      expect(quiz.correctAnswers).toEqual(1);

      quiz.guess("e");
      expect(quiz.correctAnswers).toEqual(2);

      quiz.guess("z");
      expect(quiz.correctAnswers).toEqual(3);
    });
  });

  describe("hasEnded() method", () => {
    it("should be defined", () => {
      const quiz = new Quiz([], "test", 60);
      expect(quiz.hasEnded).toBeDefined();
    });

    it("should be a function", () => {
      const quiz = new Quiz([], "test", 60);
      expect(typeof quiz.hasEnded).toBe("function");
    });

    it("should return 'false' when 'currentQuestionIndex' is less than the 'questions' array length", () => {
      const quiz = new Quiz(["a", "b", "c"], "test", 60);
      expect(quiz.hasEnded()).toBe(false);
    });

    it("should return true when 'currentQuestionIndex' is equal to the 'questions' array length", () => {
      const quiz = new Quiz(["a", "b", "c"], "test", 60);
      quiz.currentQuestionIndex = 3;
      expect(quiz.hasEnded()).toBe(true);
    });
  });
});
