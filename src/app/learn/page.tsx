"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <motion.div
        className="absolute top-8 right-8 flex items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-4xl font-bold">Learn</h1>
        <Image src="/images/Learn.png" alt="Learn" width={48} height={48}/>
      </motion.div>
      <div>This is the Learn page!</div>
    </main>
  );
}