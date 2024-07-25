import React from "react";
import { useTheme } from "./ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";

const Achievements = () => {
  const { theme } = useTheme();

  const [user] = useAuthState(auth);

  return (
    <div
      className={`p-4 rounded shadow-md w-full max-w-[30rem] ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">TEMPORARY</h1>
      <h1>TEMPORARY</h1>
    </div>
  );
};

export const AchievementsHelper = async (user: User, achievement: string) => {
  const achievementText: { [key: string]: string } = {
    createdAccount: "Create a PaperHans Account.",
    tryToggleTheme: "Try Toggle Theme.",
    visitedAbout: "Visit About Us page.",
    visitedPrices: "Visit Prices page.",
    visitedPlayground: "Visit Playground page.",
    visitedNews: "Visit News page.",
    visitedProfile: "Visit Profile page.",
    learnBTC: "Complete BTC lesson.",
    learnETH: "Complete ETH lesson.",
    learnXRP: "Complete XRP lesson.",
    learnBNB: "Complete BNB lesson.",
    learnCRO: "Complete CRO lesson.",
  };

  try {
    if (user) {
      const achievementsDocRef = doc(db, "achievements", user.uid);
      const achievementsDoc = await getDoc(achievementsDocRef);

      if (!achievementsDoc.exists()) {
        await setDoc(doc(db, "achievements", user.uid), {
          nAchievements: 1,
          createdAccount: true,
          tryToggleTheme: false,
          visitedAbout: false,
          visitedPrices: false,
          visitedPlayground: false,
          visitedNews: false,
          visitedProfile: false,
          learnBTC: false,
          learnETH: false,
          learnXRP: false,
          learnBNB: false,
          learnCRO: false,
        });
      }

      const currentData = achievementsDoc.data();
      if (currentData && !currentData[achievement]) {
        await setDoc(
          achievementsDocRef,
          {
            ...currentData,
            nAchievements: currentData ? currentData.nAchievements + 1 : 0,
            [achievement]: true,
          },
          { merge: true }
        );
        toast.success("Achievement Unlocked! " + achievementText[achievement]);
      }
    }
  } catch (e: any) {
    console.error(e);
  }
};

export default Achievements;
