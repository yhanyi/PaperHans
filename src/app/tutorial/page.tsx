"use client";

import React, { useState } from "react";
import { useTheme } from "../../components/ThemeContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Tutorial from "@/components/Tutorial";

export default function Home() {

  const router = useRouter();
  const { theme } = useTheme();
  const [ clickedHome, setClickedHome ] = useState<boolean>(false);

  const TITLE = [
    "About Us",
    "Profile",
    "Profile - Change Profile Picture",
    "Prices",
    "Prices - Vote Sentiments",
    "Playground",
    "Playground - View Tearsheet",
    "News",
    "Learn",
    "Learn - Lesson and Trivia"
  ]
  const IMAGE_URL = [
    "https://drive.google.com/uc?export=view&id=1jG4Ns5ELwErGP_bJYJhTiV9hmoZrUAYV",
    "https://drive.google.com/uc?export=view&id=1TOwzsPatS1jwYeXdv3CvpGFP9lV1D7Zs",
    "https://drive.google.com/uc?export=view&id=1sb20bFKCKsfws3ds4wXQn9Tx3f1X9pQO",
    "https://drive.google.com/uc?export=view&id=1T3X605kb1pV_UDpYkkETCappDlx99eEn",
    "https://drive.google.com/uc?export=view&id=1Fv6cl0FwTGLoqRr-70rA4Vd-57DH9WoU",
    "https://drive.google.com/uc?export=view&id=1wNRlXWsmEku4F9m649DJAgy5EHxglxR6",
    "https://drive.google.com/uc?export=view&id=1VHbNmSXMqjJ65z0DrvxlOhlDo4VjZsTD",
    "https://drive.google.com/uc?export=view&id=1IUabF4mE4wTTtahT3c4N-MbxEVJ_lEqV",
    "https://drive.google.com/uc?export=view&id=1Q9jEzG5RmYxBElmeJ6x4b-nel3R0QpLn",
    "https://drive.google.com/uc?export=view&id=1Hlb1EX9xs8fsDOa6_94wsNEENIZQf_8N"
  ]
  const CONTENT = [    
    "Visit the About Us page to gain insights on the motivation and aim behind PaperHans. Project deliverables such as the README, CHANGELOG, Poster and Video are also accessible from the page.",
    "Visit the Profile page to view your personal information as well as see Achievements badges earned.",
    "Click on your profile picture to initiate the Change Profile Picture function should you wish to swap it out for a fresh one. Once complete, you can either click on the profile picture again or press the Return button to return back.",
    "Visit the Prices page for real-time prices to stay informed on the latest market movements.",
    "Log in to vote on how you are feeling about the recent Cryptocurrency market and as well as to view the current sentiments of fellow PaperHans users.",
    "Visit the Playground page for a risk-free platform to create customised trading strategies and backtest them.",
    "Input and submit the parameters you would like to backtest with, then sit back while we generate the tearsheet for you. After tearsheet has been generated, simply scroll down to view.",
    "Visit the News page for real-time market insights as well as sentimental analysis by the FinBERT Natural Language Processing model.",
    "Visit the Learn page to access to curated datasets prepared by our field experts with a deep understanding of the domain as an alternative source of resource to NLP models.",
    "Complete the interactive Trivia after the lessons to assess your understanding as well as unlock new achievements."
  ]

  const tryHomeRedirect = () => {
    if (!clickedHome) {
      setClickedHome(true);
      return;
    } else {
      router.push("/");
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center space-y-4">

        <div className={`p-4 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
          <motion.div initial={{ y: -15, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="text-2xl font-bold text-center">
              Welcome to
            </h1>        
            <div className="flex flexrow space-x-2 justify-center">
              <Image src="/images/PaperHans.png" alt="PaperHans Logo" width={45} height={0}/>
              <h1 className="text-center text-5xl font-bold">
                PaperHans
              </h1>
            </div>

          </motion.div>
          <h1 className="text-base text-md font-md text-center">Comprehensive Guide for New Users</h1>
        </div>

        <div className={`p-2 rounded shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} max-w-[20rem]`}>
          <a href="https://docs.google.com/document/d/1YYhPiGj3DJEe8xhyofTemyj72_vM5KJCrqd1i6EiiDM/edit#heading=h.xen903qbfnbs" target="_blank" rel="noopener noreferrer">
            <h1 className="text-md font-lg text-center hover:underline">
              PaperHans Project README 🔗
            </h1>
          </a>
        </div>
        
        <button onClick={tryHomeRedirect} className={`${clickedHome?"bg-red-600":"bg-indigo-600"} text-white text-base text-lg font-medium w-[10rem] py-2 rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all`}>
          {clickedHome?"Confirm?":"End Tutorial"}
        </button>

        {TITLE.map((title, index) => (
          <Tutorial
            key={index}
            title={title}
            imageUrl={IMAGE_URL[index]}
            content={CONTENT[index]}
          />
        ))}

        <div className="h-4"></div>

      </div>
    </main>
  );
}
