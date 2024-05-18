"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <main>
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
      <Link href="playground">Playground</Link>
    </main>
  );
}
