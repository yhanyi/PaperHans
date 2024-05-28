"use client";

import Link from "next/link";
import React from "react";
import ThemeSwitch from "./theme_switch";

export default function Header() {
  return (
    <main>
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
      <Link href="playground">Playground</Link>
      <ThemeSwitch />
    </main>
  );
}
