"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useActiveSectionContext } from "./ActiveSectionContext";

type OptionProps = {
  text: "About Us" | "Prices" | "Playground" | "News" | "Learn";
  href: "/aboutUs" | "/prices" | "/playground" | "/news" | "/learn";
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Option = ({ text, href, setOpen }: OptionProps) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <React.Fragment>
      <Link
        href={href}
        onClick={() => {
          setActiveSection(text);
          setTimeOfLastClick(Date.now());
        }}
      >
        <motion.li
          variants={itemVariants}
          onClick={() => setOpen(false)}
          className="text-black dark:text-white flex items-center gap-2 px-4 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <span>{text}</span>
        </motion.li>
      </Link>
    </React.Fragment>
  );
};

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);

  let menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (e: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  return (
    <div className="md:hidden flex items-center justify-center" ref={menuRef}>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          className="z-10 flex flex-col justify-center rounded-xl items-center duration-200 p-1 w-[3rem] h-[3rem] bg-opacity-80 backgroup-blur-[0.5rem] border-opacity-40 shadow-2xl bg-white text-black dark:bg-black dark:text-white hover:scale-105 active:scale-100"
          onClick={() => setOpen((pv) => !pv)}
        >
          <div>
            <span
              className={`bg-black dark:bg-white transition-all duration-300 block h-0.5 w-4 rounded-sm ${
                open ? `rotate-45 translate-y-1` : `-translate-y-0.5`
              }`}
            ></span>
            <span
              className={`bg-black dark:bg-white transition-all duration-300 block h-0.5 w-4 rounded-sm my-0.5 ${
                open ? `opacity-0` : `opacity-100`
              }`}
            ></span>
            <span
              className={`bg-black dark:bg-white transition-all duration-300 block h-0.5 w-4 rounded-sm ${
                open ? `-rotate-45 -translate-y-1` : `translate-y-0.5`
              }`}
            ></span>
          </div>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-80%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white dark:bg-black shadow-xl absolute top-[120%] left-[50%] overflow-hidden"
        >
          <Option setOpen={setOpen} text="About Us" href="/aboutUs" />
          <Option setOpen={setOpen} text="Prices" href="/prices" />
          <Option setOpen={setOpen} text="Playground" href="/playground" />
          <Option setOpen={setOpen} text="News" href="/news" />
          <Option setOpen={setOpen} text="Learn" href="/learn" />
        </motion.ul>
      </motion.div>
    </div>
  );
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};
