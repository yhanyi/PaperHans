"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TearsheetViewer from "@/components/tearsheet_viewer";
import BacktestInput from "@/components/backtest_input";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <motion.div
        className="fixed top-8 right-8 flex items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-4xl font-bold">Playground</h1>
        <Image src="/images/Playground.png" alt="Playground" width={48} height={48}/>
      </motion.div>
      <div className="flex flex-col items-center space-y-5">
          <h1 className="text-4xl font-bold">Playground</h1>
        <div className="flex flex-col gap-20">
          <h1 className="text-xl font-bold">Input the parameters you would like to backtest.</h1>
          <BacktestInput />
          <TearsheetViewer />
        </div>
      </div>
    </main>
  );
}
