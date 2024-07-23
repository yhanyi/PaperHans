import React, { useState } from 'react';
import { useTheme } from "../components/theme_context";

interface LearnQuestions {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

const LearnQuestions: React.FC<LearnQuestions> = ({ question, options, correctAnswerIndex }) => {

  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowResult(true);
  }

  return (
    <div className={`p-4 rounded shadow-md w-96 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`p-2 rounded border ${selectedOption === index ? (index === correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-gray-300'} ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mt-4">
          {selectedOption === correctAnswerIndex ? (
            <p className="text-green-500 font-bold">Correct!</p>
          ) : (
            <p className="text-red-500 font-bold">Incorrect. The correct answer is {options[correctAnswerIndex]}.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LearnQuestions;
