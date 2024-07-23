"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import News from "@/components/news_displayer";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center space-y-5">
        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -15, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">News</h1>
          <Image src="/images/News.png" alt="News" width={48} height={48} />
        </motion.div>
        <div>
          <News />
        </div>
      </div>
    </main>
  );
}
