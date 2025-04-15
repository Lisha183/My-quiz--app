import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const QuizPage = () => {
  const { categoryId, quizIndex } = useParams();
  const navigate = useNavigate();
  const quiz = quizData[categoryId][quizIndex];
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleNext = () => {
    const nextQuizIndex = parseInt(quizIndex, 10) + 1;
    if (nextQuizIndex < quizData[categoryId].length) {
      navigate(`/quiz-list/${categoryId}/${nextQuizIndex}`);
    } else {

      navigate('/quiz-complete'); 
    }
  };

  return (
    <div>
      <h2>{quiz.question}</h2>
      <div>
        {quiz.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="quiz-option"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
      </div>

      {isSubmitted ? (
        <div>
          <h3>{selectedOption === quiz.correctAnswer ? 'Correct!' : 'Incorrect!'}</h3>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default QuizPage;
