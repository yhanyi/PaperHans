import React from "react";
import { useTheme } from "../components/theme_context";

const ErrorPopUp = ({ message, onClose }) => {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-300 bg-opacity-50'}`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">Oops! Something went wrong... :(</h2>
        <p className="text-red-500 font-bold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopUp;