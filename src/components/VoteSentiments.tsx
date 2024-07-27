
import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const VoteSentiments = () => {

  const { theme } = useTheme();
  const [ user ] = useAuthState(auth);
  const [ voted, setVoted ] = useState<boolean>(false);
  const today = new Date().toLocaleDateString().replace(/\//g, '-');
  const sentimentRef = doc(db, "votes", today);

  interface Sentiments {
    [key: string]: boolean | number;
    nBadVotes: number;
    nGoodVotes: number;
  }
  const [ sentiments, setSentiments ] = useState<Sentiments>();

  useEffect(() => {
    const loadPage = async () => {
      const sentiments = await getDoc(sentimentRef);
      if (!sentiments.exists() && user) {
        await setDoc(sentimentRef, {
          // SET TO 5 BAD 9 GOOD FOR SIMULATION
          nBadVotes: 5,
          nGoodVotes: 9,
        })
      }
      const sentimentsData = sentiments.data() as Sentiments;
      setSentiments(sentimentsData)
      if (user && sentimentsData && sentimentsData[user.uid]) {
        setVoted(true)
      }
    };
    loadPage();
  }, [user]);

  const loadSentiments = async(vote: string) => {
    try {
      let sentiments = await getDoc(sentimentRef);
      let sentimentsData = sentiments.data() as Sentiments;
      if (sentimentsData && user) {
        if (!sentimentsData[user.uid]) {
          await setDoc(sentimentRef, {
            ...sentimentsData,
            nBadVotes: (vote == "bad" ? sentimentsData.nBadVotes + 1 : sentimentsData.nBadVotes),
            nGoodVotes: (vote == "good" ? sentimentsData.nGoodVotes + 1 : sentimentsData.nGoodVotes),
            [user.uid]: true
          })
        }
        setVoted(true)
      }
      
      sentiments = await getDoc(sentimentRef);
      sentimentsData = sentiments.data() as Sentiments;
      setSentiments(sentimentsData);
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

  const getTotalVotes = () => {
    if (sentiments && typeof sentiments.nGoodVotes === 'number' && typeof sentiments.nBadVotes === 'number') {
        const totalVotes = sentiments.nGoodVotes + sentiments.nBadVotes
      return totalVotes
    }
  }

  const calculateGoodSentimentsPercentage = () => {
    if (sentiments && typeof sentiments.nGoodVotes === 'number' && typeof sentiments.nBadVotes === 'number') {
        const totalVotes = sentiments.nGoodVotes + sentiments.nBadVotes
        const percentage = (sentiments.nGoodVotes / totalVotes) * 100
      return percentage.toFixed(2)
    }
  }

  const calculateBadSentimentsPercentage = () => {
    if (sentiments && typeof sentiments.nGoodVotes === 'number' && typeof sentiments.nBadVotes === 'number') {
      const totalVotes = sentiments.nGoodVotes + sentiments.nBadVotes
      const percentage = (sentiments.nBadVotes / totalVotes) * 100
    return percentage.toFixed(2)
  }
  }


  return (
    <>
      {user ? (<>
        <div className={`p-4 rounded shadow-md w-full max-w-[21rem] space-y-1 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
          <h1 className="text-xl font-bold text-center">Daily Market Sentiments</h1>
          <h2 className="text-sm font-sm text-center">How do you feel about the current market?</h2>
          {
            voted?(
            <>
              <div className="flex flex-row space-x-2 justify-center">
                <button className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                  {calculateGoodSentimentsPercentage()}% 👍🏻
                </button>
                <button className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                  {calculateBadSentimentsPercentage()}% 👎🏻
                </button>
              </div>
              <h3 className="text-sm font-sm text-center">{getTotalVotes()} people voted today!</h3>
            </>
            ):(
            <>
              <div className="flex flex-row space-x-2 justify-center">
                <button onClick={() => loadSentiments("good")} className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                  Good 👍🏻
                </button>
                <button onClick={() => loadSentiments("bad")} className="bg-indigo-600 text-white text-2xl font-medium py-1 rounded w-1/2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                  Bad 👎🏻
                </button>
              </div>
              <h3 className="text-sm font-sm text-center">Vote to see poll results.</h3>
            </>)
          }
        </div>
      </>):(<>
        
      </>)}
    
    </>
  );
};

export default VoteSentiments;