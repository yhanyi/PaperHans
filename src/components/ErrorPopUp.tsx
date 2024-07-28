import React from "react";
import { useTheme } from "./ThemeContext";

type ErrorProps = {
  message: string;
  onClose: () => void;
};

const ErrorPopUp = ({ message, onClose }: ErrorProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50`}
    >
      <div
        className={`max-w-sm ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } p-6 rounded shadow-lg`}
      >
        <h1 className="text-2xl font-bold mb-4">
          Ohh no! You got a Paper Cut!
        </h1>
        <h1 className="text-red-600 text-md font-medium mb-4">{message}</h1>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`text-base md:text-md font-medium py-1 px-4 p-3 rounded bg-indigo-600 text-white hover:bg-indigo-500`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
