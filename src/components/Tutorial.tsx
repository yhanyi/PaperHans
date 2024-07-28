
import React from "react";
import { useTheme } from "./ThemeContext";
import Image from 'next/image';

interface TutorialProps {
  title: string,
  imageUrl: string,
  content: string
}

const Tutorial: React.FC<TutorialProps> = ({ title, imageUrl, content }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 rounded shadow-md w-full max-w-[32rem] space-y-2 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <Image src={`${imageUrl}`} alt={`${title}`} width={464} height={0}/>
      <h2 className="text-md font-bold text-left">{content}</h2>
    </div>
  );
};

export default Tutorial;
