import React from "react";
import { useTheme } from "./ThemeContext";

interface LearnInfoProps {
  topic: string;
  content: string;
}

const LearnInfo: React.FC<LearnInfoProps> = ({ topic, content }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded shadow-md max-w-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">{topic}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default LearnInfo;
