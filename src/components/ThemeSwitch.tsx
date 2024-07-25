"use client";

import React from "react";
import { useTheme } from "./ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [user] = useAuthState(auth);

  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backgroup-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={() => {
        toggleTheme();
        if (user) AchievementsHelper(user, "tryToggleTheme");
      }}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
