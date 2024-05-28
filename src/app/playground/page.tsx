"use client";

import React from "react";
import TearsheetViewer from "@/components/tearsheet_viewer";
import BacktestInput from "@/components/backtest_input";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <div>This is the playground page!</div>
      <div className="flex flex-col gap-20">
        <h1>Input the parameters you would like to backtest.</h1>
        <BacktestInput />
        <TearsheetViewer />
      </div>
    </main>
  );
}
