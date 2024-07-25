"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TearsheetViewer from "@/components/TearsheetViewer";
import BacktestInput from "@/components/BacktestInput";
import AlpacaKeyForm from "@/components/AlpacaKeyForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";
import SignInRedirect from "@/components/SignInRedirect";

export default function Home() {
  const [user] = useAuthState(auth);
  useEffect(() => {
    const loadPage = async () => {
      if (user) {
        await AchievementsHelper(user, "visitedPlayground");
      }
    };
    loadPage();
  }, [user]);

  return (
    <main className="flex flex-col gap-10 center ">
      {" "}
      {user ? (
        <div className="flex flex-col items-center space-y-5">
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: -15, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-4xl font-bold">Playground</h1>
            <Image
              src="/images/Playground.png"
              alt="Playground"
              width={48}
              height={48}
            />
          </motion.div>
          <AlpacaKeyForm />
          <div className="flex flex-col gap-20 items-center justify-center">
            <h1 className="text-base md:text-xl font-bold">
              Input the parameters you would like to backtest.
            </h1>
            <BacktestInput />
            <TearsheetViewer />
          </div>
        </div>
      ) : (
        <SignInRedirect></SignInRedirect>
      )}
    </main>
  );
}
