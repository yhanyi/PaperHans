"use client";

import TearsheetDisplay from "@/components/tearsheet";
import UserInput from "../../components/testinput";
import React from "react";

export default function Home() {
  return (
    <main>
      <div>This is the playground page!</div>
      <div>
        <h1>Test Input</h1>
        <UserInput />
        <TearsheetDisplay />
      </div>
    </main>
  );
}
