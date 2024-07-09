"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import MenuDropdown from "./menudropdown";
import AuthButton from "./AuthButton";

import { links } from "@/lib/links-data";

export default function Header() {
  return (
    // <main>
    //   <motion.div
    //     className="fixed top-8 left-8 flex items-center"
    //     initial={{ y: -100, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1 }}
    //   >
    //     <Image
    //       src="/images/PaperHans.png"
    //       alt="PaperHans Logo"
    //       width={48}
    //       height={48}
    //     />
    //     <h1 className="text-2xl md:text-4xl font-bold">PaperHans</h1>
    //   </motion.div>
    //   <header className="z-[999] relative">
    //     <motion.div
    //       className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity/75"
    //       initial={{ y: -100, x: "-50%", opacity: 0 }}
    //       animate={{ y: 0, x: "-50%", opacity: 1 }}
    //     ></motion.div>
    //     {/* <nav className="hidden md:flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
    //       <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
    //         {links.map((link) => (
    //           <motion.li
    //             key={link.hash}
    //             className="h-3/4 flex items-center justify-center relative"
    //             initial={{ y: -100, opacity: 0 }}
    //             animate={{ y: 0, opacity: 1 }}
    //           >
    //             <Link
    //               href={link.hash}
    //               className={clsx(
    //                 "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300"
    //               )}
    //             >
    //               {link.name}
    //             </Link>
    //           </motion.li>
    //         ))}
    //       </ul>
    //     </nav> */}
    //     <MenuDropdown />
    //     <AuthButton />
    //   </header>
    // </main>
    <header className="duration-500 z-[10] py-2 fixed top-0 flex justify-between md:justify-center w-full px-2 md:px-10 bg-light dark:bg-dark bg-opacity-80 dark:bg-opacity-80 gap-10">
      <div className="flex">
        <h1 className="hidden md:flex text-base md:text-2xl font-bold">
          PaperHans
        </h1>
        <Image
          src="/images/PaperHans.png"
          alt="PaperHans Logo"
          width={48}
          height={48}
        />
      </div>
      <nav className="hidden md:flex justify-center items-center py-0 border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] h-[3.25rem] sm:w-[40rem] w-[20rem] rounded-full dark:bg-black dark:border-black/40 dark:bg-opacity/75">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 dark:text-gray-400 sm:w-[initial] gap-5">
          {links.map((link) => (
            <li
              key={link.hash}
              className="h-3/4 flex items-center justify-center relative"
            >
              <Link
                href={link.hash}
                className="flex w-full items-center justify-center px-2 py-3 hover:text-black transition dark:hover:text-white"
              >
                {link.name}

                <motion.span
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                ></motion.span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="gap-2 flex flex-row">
        <AuthButton />
        <MenuDropdown />
      </div>
    </header>
  );
}
