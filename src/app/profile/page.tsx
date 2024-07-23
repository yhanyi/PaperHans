"use client";

import React from "react";
import { motion } from "framer-motion";
import Profile from "../../components/Profile";
import Image from "next/image";

export default function Home() {

  return (
    <main>
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
      </div>
    </main>
  );
}