"use client";

import React from "react";
import TearsheetViewer from "@/components/tearsheet_viewer";
import BacktestInput from "@/components/backtest_input";

export default function Home() {
  return (
    <main>
      <div>This is the playground page!</div>
      <div>
        <h1>Input the parameters you would like to backtest.</h1>
        <BacktestInput />
        <TearsheetViewer />
      </div>
    </main>
  );
}
