"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Profile from "../../components/Profile";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Achievements, { AchievementsHelper } from "@/components/Achievements";
import SignInRedirect from "@/components/SignInRedirect";

export default function Home() {

  const[ user ] = useAuthState(auth)
  useEffect(() => {
    const loadPage = async () => {
      if (user) {
        await AchievementsHelper(user, 'visitedProfile');
      }
    };
    loadPage();
  }, [user]);

  return (
    <main>{user?
      <div className="flex flex-col items-center space-y-5">
        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -15, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">Profile</h1>
          <Image src="/images/Profile.png" alt="Profile" width={48} height={48} />
        </motion.div>

        <Profile ></Profile>

        <Achievements></Achievements>

      </div>:<SignInRedirect></SignInRedirect>}
    </main>
  );
}