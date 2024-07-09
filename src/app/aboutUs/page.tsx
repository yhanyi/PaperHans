"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* <motion.div
        className="fixed top-8 items-center justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex flex-row items-center border border-1">
          <h1 className="text-2xl md:text-4xl font-bold">About Us</h1>
          <Image
            src="/images/AboutUs.png"
            alt="AboutUs"
            width={48}
            height={48}
          />
        </div>
      </motion.div> */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold">
            About Team Han<sup>2</sup>
          </h1>
        </motion.div>
        <h1 className="text-base md:text-xl font-bold">Orbital</h1>
        <div className="h-4"></div>
        <div className="flex gap-16">
          <Image
            src="/images/HanYu.png"
            alt="Han Yu"
            width={175}
            height={175}
          />
          <Image
            src="/images/HanYi.png"
            alt="Han Yi"
            width={175}
            height={175}
          />
        </div>
        <div className="h-2"></div>
        <div className="flex text-2xl md:text-4xl gap-32 font-bold">
          <h1>Han Yu</h1>
          <h1>Han Yi</h1>
        </div>
        <div className="h-8"></div>
        <h1 className="text-2xl md:text-4xl font-bold">Our Motivation</h1>
        <p className="max-w-lg mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
          As of 2023, there are an estimated <strong>420 million users</strong>{" "}
          (4.2% of the global population) exposed to cryptocurrency. With the
          recent resurgence of cryptocurrency in 2024, it is expected for an{" "}
          <strong>influx of novice traders</strong> to enter the volatile
          market. We <strong>aim</strong> to provide cryptocurrency enthusiasts
          with a digital platform to{" "}
          <strong>
            gain insights into the market to make key trading decisions
          </strong>
          .
        </p>
      </div>
    </main>
  );
}
