"use client";

import React, { useEffect } from "react";
import { useTheme } from "../../components/ThemeContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";
import LearnInfo from "@/components/LearnInfo";

export default function Home() {

  const router = useRouter();
  const { theme } = useTheme();
  const [ user ] = useAuthState(auth)
  useEffect(() => {
    const loadPage = async () => {
      if (user) {
        await AchievementsHelper(user, 'visitedAbout');
      }
    };
    loadPage();
  }, [user]);

  return (
    <main>
      <div className="flex flex-col items-center">

        <div className={`p-4 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} max-w-[20rem]`}>
          <motion.div initial={{ y: -15, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="text-3xl font-bold text-center">
              About Team Han<sup>2</sup>
            </h1>
          </motion.div>
          <h2 className="text-base text-xl font-md text-center">NUS Orbital 2024</h2>
        </div>

        <div className="h-4"></div>
        
        <div className={`p-4 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} w-full max-w-lg`}>
          <div className="flex space-x-4 justify-center">
            <Image src="/images/HanYu.png" alt="Han Yu" width={230} height={0}/>
            <Image src="/images/HanYi.png" alt="Han Yi" width={230} height={0}/>
          </div>
          <div className="h-2"></div>
          <div className="flex space-x-40 justify-center text-2xl font-bold ">
            <h1>Han Yu</h1>
            <h1>Han Yi</h1>
          </div>
        </div>

        <div className="h-4"></div>

        <div className={`p-2 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} max-w-[20rem]`}>
          <a href="https://docs.google.com/document/d/1YYhPiGj3DJEe8xhyofTemyj72_vM5KJCrqd1i6EiiDM/edit#heading=h.xen903qbfnbs" target="_blank" rel="noopener noreferrer">
            <h1 className="text-md font-lg text-center hover:underline">
              PaperHans Project README 🔗
            </h1>
          </a>
        </div>
        
        <div className="h-4"></div>

        <div className={`p-2 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} max-w-[20rem]`}>
          <a href="https://docs.google.com/spreadsheets/d/1rY75tFdyqRqVAe7jtrbcQ3uYtsDIPZN3vAa8r9LYMJA/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">
            <h1 className="text-md font-lg text-center hover:underline">
              PaperHans Project CHANGELOG 🔗
            </h1>
          </a>
        </div>

        <div className="h-4"></div>

        <LearnInfo
          topic="Our Motivation"
          content="As of 2023, there are an estimated <strong>420 million people
          </strong> (4.2% of the global population) exposed to cryptocurrency. 
          With the recent resurgence of cryptocurrency in 2024, it is expected 
          for an <strong>influx of novice traders</strong> to enter the volatile
          market."
        />

        <div className="h-4"></div>

        <LearnInfo
          topic="Our Aim"
          content="PaperHans aims to provide cryptocurrency enthusiasts with a 
          digital platform to <strong>gain market insights</strong> and make
          <strong>informed trading decisions</strong>. Our web app offers users 
          a playground environment for automated paper trading as well as
          leverages large language models for real-time information and market 
          sentiment analysis, enhancing the overall trading experience. 
          Recognising the issue of Imperfect Information in the everchanging 
          market, PaperHans also provides curated lessons to educate our users."
        />

        <div className="h-4"></div>

        <div className={`p-4 rounded shadow-md max-w-lg w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
          <h1 className="text-xl font-bold mb-4 text-center">Project Poster</h1>
          <h2 className="flex justify-center">
            <Image src="https://drive.google.com/uc?id=1uerqaLgKDD7drkws2qjrKc0zp6OUBqp0" alt="Project Poster" width={464} height={0}/>
          </h2>
        </div>

        <div className="h-4"></div>

        <div className={`p-4 rounded shadow-md max-w-lg w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
          <h1 className="text-xl font-bold mb-4 text-center">Project Video</h1>
          <h2 className="flex justify-center">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowFullScreen style={{ width: '464px', height: '261px', border: 'none' }}/>
          </h2>
        </div>

        <div className="h-8"></div>

        <button onClick={() => router.push("/tutorial")} className="bg-indigo-600 text-white text-base text-lg font-medium w-[10rem] py-2 rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
          Tutorial
        </button>

        <div className="h-4"></div>
        
      </div>
    </main>
  );
}
