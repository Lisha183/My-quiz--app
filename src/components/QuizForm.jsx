import React, { useState, useEffect } from "react";

const QuizForm = ({ onSubmit, initialData }) => {
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    questions: [
      {
        questionText: "",
        type: "mcq",
        options: ["", "", "", ""],
        correctAnswer: "",
        correctAnswerIndex: 0,
        difficulty: "easy",
      },
    ],
  });

  useEffect(() => {
    if (initialData) {
      setQuizData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAddQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "",
          type: "mcq",
          options: ["", "", "", ""],
          correctAnswer: "",
          correctAnswerIndex: 0,
          difficulty: "easy",
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedData = {
      ...quizData,
      questions: quizData.questions.map((q) => {
        if (q.type === "mcq") {
          return {
            ...q,
            correctAnswer: q.options[q.correctAnswerIndex],
          };
        }
        return q;
      }),
    };
    onSubmit(normalizedData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={quizData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Questions</h3>
      {quizData.questions.map((question, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <label className="block text-gray-700 mb-2">Question {index + 1}</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, e)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label className="block text-gray-700 mb-1">Question Type</label>
          <select
            name="type"
            value={question.type}
            onChange={(e) => handleQuestionChange(index, e)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            <option value="mcq">Multiple Choice</option>
            <option value="short-answer">Short Answer</option>
            <option value="fill-in-the-blank">Fill in the Blank</option>
          </select>

          {question.type === "mcq" && (
            <div>
              <label className="block text-gray-700 mb-1">Options</label>
              {question.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder={`Option ${optIndex + 1}`}
                />
              ))}
              <label className="block text-gray-700">Correct Answer Index</label>
              <input
                type="number"
                name="correctAnswerIndex"
                value={question.correctAnswerIndex}
                onChange={(e) => handleQuestionChange(index, e)}
                min="0"
                max={question.options.length - 1}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
            </div>
          )}

          {(question.type === "short-answer" || question.type === "fill-in-the-blank") && (
            <div>
              <label className="block text-gray-700 mb-1">Correct Answer</label>
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
            </div>
          )}

          <label className="block text-gray-700 mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={question.difficulty}
            onChange={(e) => handleQuestionChange(index, e)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            type="button"
            onClick={() => handleRemoveQuestion(index)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white p-2 rounded mr-2">
        Add Question
      </button>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialData ? "Update Quiz" : "Create Quiz"}
      </button>
    </form>
  );
};

export default QuizForm;
