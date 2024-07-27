"use client";

import React, { useState } from "react";
import { useTheme } from "../../components/ThemeContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LearnInfo from "@/components/LearnInfo";

export default function Home() {

  const router = useRouter();
  const { theme } = useTheme();
  const [ clickedHome, setClickedHome ] = useState<boolean>(false);

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
      
      </div>
    </main>
  );
}
