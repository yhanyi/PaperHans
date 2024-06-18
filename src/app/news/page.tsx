"use client"

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <motion.div
        className="fixed top-8 right-8 flex items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-4xl font-bold">News</h1>
        <Image src="/images/News.png" alt="News" width={48} height={48}/>
      </motion.div>
      <div>This is the News page!</div>
      <div>
        <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index"/>
      </div>
    </main>
  );
}
