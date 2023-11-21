describe("Question", () => {
  describe("class", () => {
    it("should be defined", () => {
      expect(Question).toBeDefined();
    });

    it("should receive 3 arguments", () => {
      expect(Question.length).toEqual(3);
    });

    it("should receive 'text' string as its 1st argument", () => {
      const testText = "What is 2 + 2?";
      const question = new Question(testText, [], "test");
      expect(question.text).toEqual(testText);
    });

    it("should receive 'choices' array as its 2nd argument", () => {
      const testChoices = ["choice1", "choice2", "choice3"];
      const question = new Question("test", testChoices, "test");
      expect(question.choices).toEqual(testChoices);
    });

    it("should receive 'answer' string as its 3rd argument", () => {
      const testAnswer = "This is a test answer";
      const question = new Question("test", [], testAnswer);
      expect(question.answer).toEqual(testAnswer);
    });
  });

  describe("shuffleChoices() method", () => {
    it("should be defined", () => {
      const question = new Question("test", [], "test");
      expect(question.shuffleChoices).toBeDefined();
    });

    it("should be a function", () => {
      const question = new Question("test", [], "test");
      expect(typeof question.shuffleChoices).toBe("function");
    });

    it("should return undefined if 'choices' array is empty", () => {
      const question = new Question("test", [], "test");
      expect(question.shuffleChoices()).toBeUndefined();
    });

    it("should return undefined if 'choices' array is not defined", () => {
      const question = new Question("test", undefined, "test");
      expect(question.shuffleChoices()).toBeUndefined();
    });

    it("should shuffle the items in the 'choices' array", () => {
        const testChoices = ["choice1", "choice2", "choice3"];
        const question = new Question("test", testChoices, "test");
        question.shuffleChoices();
        expect(question.choices).not.toEqual(testChoices);
    });

  });
});
