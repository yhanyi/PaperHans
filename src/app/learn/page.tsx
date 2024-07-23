"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import LearnQuestions from "../../components/LearnQuestions";
import LearnInfo from "../../components/LearnInfo";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";
import SignInRedirect from "@/components/SignInRedirect";

export default function Home() {

  const router = useRouter();
  const[ user ] = useAuthState(auth)

  interface Lesson {
    name: string;
    tag: string;
    information: string;
    nQuestions: number;
  }
  const[lesson, setLesson] = useState<Lesson>();

  interface Question {
    qn: string;
    options: string[];
    answer: number;
  }
  const[questionsList, setQuestionsList] = useState<Question[]>([]);

  const pushLesson = async(id: string) => {
    const lessonRef = doc(db, "learn", id);
    const questionsRef = collection(db, "learn", id, "questions")
    try {
      const lesson = await getDoc(lessonRef);
      const questions = await getDocs(questionsRef);
      if (lesson.exists()) {
        const lessonData = lesson.data() as Lesson;
        const questionsData = questions.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            qn: data.qn,
            options: [data.option1, data.option2, data.option3, data.option4],
            answer: data.answer
          }
        }) as Question[];
        setLesson(lessonData);
        setQuestionsList(questionsData)
      } else {
        console.log("Document not Found!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }

  return (
    <main className="flex flex-col items-center space-y-5">{user?<>
      <motion.div
        className="flex items-center gap-2"
        initial={{ y: -15, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-4xl font-bold">Learn</h1>
        <Image src="/images/Learn.png" alt="Learn" width={48} height={48} />
      </motion.div>

      <div className="flex space-x-4">
        <button
          onClick={() => { if(lesson?.tag != 'BTC') pushLesson('bitcoin'); }}
          className="bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        > BTC </button>
        <button
          onClick={() => { if(lesson?.tag != 'ETH') pushLesson('ethereum'); }}
          className="bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        > ETH </button>
        <button
          onClick={() => { if(lesson?.tag != 'XRP') pushLesson('ripple-xrp'); }}
          className="bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        > XRP </button>
        <button
          onClick={() => { if(lesson?.tag != 'BNB') pushLesson('binance-coin'); }}
          className="bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        > BNB </button>
        <button
          onClick={() => { if(lesson?.tag != 'CRO') pushLesson('cronos'); }}
          className="bg-indigo-600 text-white text-base md:text-lg font-medium px-6 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        > CRO </button>
      </div>

      <LearnInfo
          topic={lesson?.name || "Learn about your favourite Cryptocurrency!"}
          content={lesson?.information || "Click on a cryptocurrency of your choice to start your learning! After each lesson, your knowledge will be assessed by a set of trivia questions."}
      />
      
      <div className="h-4"></div>
      {lesson && (
        <LearnInfo
          topic="Trivia Questions"
          content="Good job! You have successfully completed the lesson! Attempt the trivia questions below to assess your learning!"
        />
      )}
      {questionsList.map(question => (
        <LearnQuestions
          key={question.qn}
          question={question.qn}
          options={question.options}
          correctAnswerIndex={question.answer}/>
      ))}

      <div className="h-8"></div></>:<SignInRedirect></SignInRedirect>}

    </main>
  );
}
