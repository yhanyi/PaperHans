"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";

export default function Home() {

  const[ user ] = useAuthState(auth)
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
        <motion.div
          initial={{ y: -15, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">
            About Team Han<sup>2</sup>
          </h1>
        </motion.div>
        <h1 className="text-base md:text-xl font-bold">Orbital</h1>
        <div className="h-4"></div>
        <div className="flex gap-16">
          <Image
            src="/images/HanYu.png"
            alt="Han Yu"
            width={175}
            height={175}
          />
          <Image
            src="/images/HanYi.png"
            alt="Han Yi"
            width={175}
            height={175}
          />
        </div>
        <div className="h-2"></div>
        <div className="flex text-2xl md:text-4xl gap-32 font-bold">
          <h1>Han Yu</h1>
          <h1>Han Yi</h1>
        </div>
        <div className="h-8"></div>
        <h1 className="text-2xl md:text-4xl font-bold">Our Motivation</h1>
        <p className="max-w-lg mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
          As of 2023, there are an estimated <strong>420 million users</strong>{" "}
          (4.2% of the global population) exposed to cryptocurrency. With the
          recent resurgence of cryptocurrency in 2024, it is expected for an{" "}
          <strong>influx of novice traders</strong> to enter the volatile
          market. We <strong>aim</strong> to provide cryptocurrency enthusiasts
          with a digital platform to{" "}
          <strong>
            gain insights into the market to make key trading decisions
          </strong>
          .
        </p>
      </div>
    </main>
  );
}
