
import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";

const ACHIEVEMENTS = {
  BTC: "learnBTC",
  ETH: "learnETH",
  XRP: "learnXRP",
  BNB: "learnBNB",
  CRO: "learnCRO"
}

interface Lesson {
  name: string;
  tag: string;
  information: string;
  nQuestions: number;
}

interface Question {
  qn: string;
  options: string[];
  answer: number;
}

interface LearnQuestions {
  lesson: Lesson;
  questionsList: Question[];
}

const LearnQuestions: React.FC<LearnQuestions> = ({ lesson, questionsList}) => {

  const { theme } = useTheme();
  const [ user ] = useAuthState(auth)
  const [ selectedOption, setSelectedOption ] = useState<number | null>(null);
  const [ showResult, setShowResult ] = useState<boolean>(false);
  const [ currQuestion, setCurrQuestion ] = useState<number>(0);
  const [ score, setScore ] = useState<number>(0);
  const [ attempts, setAttempts ] = useState<number>(0);
  const [ completed, setCompleted ] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrQuestion(0);
    setScore(0);
    setAttempts(0);
    setCompleted(false);
  }, [lesson, questionsList]);

  const handleOptionClick = (index: number) => {
    if (index == questionsList[currQuestion].answer) {
      setScore(score + 1)
    }
    setSelectedOption(index);
    setShowResult(true);
    setAttempts(attempts + 1)
  };

  const getButtonColour = (index : number) => {
    if (selectedOption != null && (index == selectedOption)) {
      if (index == questionsList[currQuestion].answer) {
        return "bg-green-600";
      } else {
        return "bg-red-600";
      }
    } else {
      return "bg-blue-600";
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrQuestion(currQuestion + 1)
  }

  const completeTrivia = () => {
    const setAchievementsData = async () => {
      if (user && lesson) {
        type achievementKeyType = keyof typeof ACHIEVEMENTS;
        const achievementKey = lesson.tag as achievementKeyType;
        await AchievementsHelper(user, ACHIEVEMENTS[achievementKey]);
      }
    };
    setAchievementsData();
    setCompleted(true);
  }

  return (
    <>
      <div className={`p-4 rounded shadow-md w-96 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <>
          <h1 className="text-lg font-bold text-center">
            Score: <span className="text-green-600 text-2xl">{score}</span><span className="text-2xl">/{attempts}</span> Attempts
          </h1>
          {completed?(
          <>
            <h2 className="text-md font-bold text-green-600 text-center">
              Wonderful! You have completed the Trivia.
            </h2>
            <h3 className="text-sm font-sm text-center">
              Check your <a href="/profile" className="hover:underline">Profile</a> for Achievements.
            </h3>
          </>
          ):(
          <>
            <h2 className="text-md font-md text-center">
              There are a total of <span className="text-xl font-bold">{lesson.nQuestions}</span> Trivia Questions.
            </h2>
            <h3 className="text-sm font-sm text-center">
              Complete all to unlock a Learn Achievement.
            </h3>
          </>
          )}
        </>
      </div>

      <div className={`p-4 rounded shadow-md w-96 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <h1 className="text-lg font-lg mb-4">
          <span className="font-bold">Qn {currQuestion + 1}.</span> {questionsList[currQuestion].qn}
        </h1>
        <div className="flex flex-col space-y-2">
          {questionsList[currQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(index)} disabled={showResult}
              className={`${getButtonColour(index)} text-white text-md font-md py-3 rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all`}
            >
              {option}
            </button>
          ))}
          {showResult?(
            <div className="flex flex-row justify-between">
              {selectedOption === questionsList[currQuestion].answer ? (
                <p className="text-lg font-bold text-green-600">
                  Correct!
                </p>
              ) : (
                <p className="text-lg font-bold text-red-600">
                  Incorrect. <span className="text-sm">Answer: {questionsList[currQuestion].options[questionsList[currQuestion].answer]}.</span>
                </p>
              )}
              {attempts == lesson.nQuestions? <>
                <button className="p-1 bg-indigo-600 text-white text-md font-md py-1 rounded w-1/4 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  onClick={completeTrivia} disabled={completed} hidden={completed}>
                    Complete Triva
                </button></>:
                <button className="p-1 bg-indigo-600 text-white text-md font-md py-1 rounded w-1/4 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  onClick={nextQuestion}>
                    Next Question
                </button>
              }
            </div>
          ):(
            <p className="text-lg font-lg text-center">
              Click on an option to select your answer.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LearnQuestions;
