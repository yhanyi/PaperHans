
import React from "react";
import { useTheme } from "./ThemeContext";


const VoteSentiments = () => {
  const { theme } = useTheme();


  return (
    <div className={`p-4 rounded shadow-md w-full max-w-[21rem] space-y-1 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-xl font-bold text-center">Weekly Market Sentiments</h1>
      <h2 className="text-sm font-sm text-center">How do you feel about the current market?</h2>
      <div className="flex flex-row space-x-2 justify-center">
        <button onClick={() => {}} className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
          Good 👍🏻
        </button>
        <button onClick={() => {}} className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
          Bad 👎🏻
        </button>
      </div>
      <h3 className="text-sm font-sm text-center">Vote to see poll results.</h3>
    </div>
  );
};

export default VoteSentiments;