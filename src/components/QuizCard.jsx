import React, { useState } from 'react';

const QuizCard = ({ question, options, correctAnswer, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onAnswer(option === correctAnswer);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-2 my-1 rounded ${
                selected === option
                  ? option === correctAnswer
                    ? 'bg-green-200'
                    : 'bg-red-200'
                  : 'bg-gray-100'
              }`}
              disabled={selected !== null}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizCard;
