import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { doc, setDoc, getDoc, DocumentData } from "firebase/firestore";
import { storage } from '@/app/firebase/config'; 
import { ref, getDownloadURL } from 'firebase/storage';
import { User } from 'firebase/auth';
import Image from "next/image";

const TOTAL_ACHIEVEMENTS = 13;

const ACHIEVEMENTS = [
  "createdAccount",
  "tryToggleTheme",
  "visitedAbout",
  "visitedPrices",
  "visitedPlayground",
  "visitedNews",
  "visitedLearn",
  "visitedProfile",
  "learnBTC",
  "learnETH",
  "learnXRP",
  "learnBNB",
  "learnCRO"
];

const ACHIEVEMENTS_TITLE : { [key: string]: string } = {
  createdAccount: "PaperHans Allegiance",
  tryToggleTheme: "Bravo Six, Going Dark",
  visitedAbout: "Oh So Inspiring",
  visitedPrices: "Stonks",
  visitedPlayground: "Having Fun",
  visitedNews: "The Noose",
  visitedLearn: "Smarty Pants",
  visitedProfile: "Who Are You?",
  learnBTC: "BTC Expert",
  learnETH: "ETH Expert",
  learnXRP: "XRP Expert",
  learnBNB: "BNB Expert",
  learnCRO: "CRO Expert"
};

const ACHIEVEMENTS_DESCRIPTION : { [key: string]: string } = {
  createdAccount: "Create a PaperHans Account.",
  tryToggleTheme: "Try the Toggle Theme feature.",
  visitedAbout: "Visit the About Us page.",
  visitedPrices: "Visit the Prices page.",
  visitedPlayground: "Visit the Playground page.",
  visitedNews: "Visit the News page.",
  visitedLearn: "Visit the Learn page.",
  visitedProfile: "Visit the Profile page.",
  learnBTC: "Complete the BTC lesson.",
  learnETH: "Complete the ETH lesson.",
  learnXRP: "Complete the XRP lesson.",
  learnBNB: "Complete the BNB lesson.",
  learnCRO: "Complete the CRO lesson."
};

const Achievements = () => {
  const { theme } = useTheme();
  const [ user ] = useAuthState(auth)
  const [ images, setImages ] = useState<{ [key: string]: string }>({});
  const [ achievementsData, setAchievementsData ] = useState<DocumentData>();

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls: { [key: string]: string } = {};
      for (const ach of ACHIEVEMENTS) {
        try {
        const storageRef = ref(storage, `achievements/${ach}.png`);
        const url = await getDownloadURL(storageRef);
        if (url)
          imageUrls[ach] = url;
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }
      setImages(imageUrls);
    };

    const fetchAchievements = async () => {
      try {
        if (user) {
          const achievementsDocRef = doc(db, "achievements", user.uid);
          const achievementsDoc = await getDoc(achievementsDocRef);
          if(achievementsDoc.exists()) {
            const achievementsData = achievementsDoc.data()
            console.log('Achievements Data:', achievementsData);
            setAchievementsData(achievementsData)
          }
        }
      } catch (error) {
        console.error('Error fetching Achievements Data', error);
      }
    }

    fetchImages();
    fetchAchievements();
  }, [user]);

  return (<>
  {/* HEADER */}
    <div className={`p-4 rounded shadow-md w-full max-w-[30rem] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">
          Achievements
        </h1>
        <div className="flex flex-row items-center space-x-2">
          <h2 className="text-lg font-md">
            Completed <strong>{achievementsData ? achievementsData.nAchievements : "Error Loading Data"} / {TOTAL_ACHIEVEMENTS}</strong>
          </h2>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      {ACHIEVEMENTS.map((achievement) => (
      <>
        <div className="h-2"></div>
        <div className={`p-4 rounded shadow-md w-full max-w-[30rem] ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
          <div className="flex items-center space-x-5">
            {achievementsData ? (
              achievementsData[achievement] ? (
              <>
                <div className="relative w-24 h-24 overflow-hidden rounded-md">
                  <Image src={images[achievement] || "/images/imageNotFound.png"} alt="Achievement Image" fill style={{ objectFit: 'cover'}}/>
                </div>
                
                <div className="flex flex-col items-left">
                      <h1 className="text-2xl font-bold">
                        {ACHIEVEMENTS_TITLE[achievement]}
                      </h1>
                      <h2 className="text-lg font-md">
                        {ACHIEVEMENTS_DESCRIPTION[achievement]}
                      </h2>
                      <h3 className="text-md font-md text-green-600">
                        COMPLETED
                      </h3>
                </div>
              </>):(
              <>
                <div className="relative w-24 h-24 overflow-hidden rounded-md">
                  {images[achievement]?
                    <Image src={images[achievement]} alt="Achievement Locked Image" fill style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}/>
                  :
                    <Image src={"/images/imageNotFound.png"} alt="Achievement Locked Image" fill style={{ objectFit: 'cover' }}/>
                  }
                </div>
                
                <div className="flex flex-col items-left">
                      <h1 className="text-2xl font-bold">
                        {ACHIEVEMENTS_TITLE[achievement]}
                      </h1>
                      <h2 className="text-lg font-md">
                        {ACHIEVEMENTS_DESCRIPTION[achievement]}
                      </h2>
                      <h3 className="text-md font-md text-red-600">
                        ACHIEVEMENT LOCKED
                      </h3>
                </div>
              </>)
            ):(
            <>
              <h1 className="text-3xl font-bold text-red-600">
                ERROR LOADING ACHIEVEMENTS: CHECK DATA
              </h1>
            </>)}
          </div>
        </div>
      </>))}
    </div>
    <div className="h-4"></div>
  </>)
};

export default Achievements;

export const AchievementsHelper = async (user : User, achievement : string) => {
  
  try {
    if (user) {
      const achievementsDocRef = doc(db, "achievements", user.uid);
      const achievementsDoc = await getDoc(achievementsDocRef);

      if (!achievementsDoc.exists()) {
        await setDoc(achievementsDocRef, {
          nAchievements: 1,
          createdAccount: true,
          tryToggleTheme: false,
          visitedAbout: false,
          visitedPrices: false,
          visitedPlayground: false,
          visitedNews: false,
          visitedLearn: false,
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
        await setDoc(achievementsDocRef, {
          ...currentData,
          nAchievements : (currentData ? currentData.nAchievements + 1 : 0),
          [achievement]: true
        }, { merge: true });
      }
    }
  } catch (e: any) {
    console.error(e);
  }
};