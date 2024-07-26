"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AchievementsHelper } from "@/components/Achievements";

export default function Home() {
  
  const { theme } = useTheme();
  const[ user ] = useAuthState(auth)
  useEffect(() => {
    const loadPage = async () => {
      if (user) {
        await AchievementsHelper(user, 'visitedPrices');
      }
    };
    loadPage();
  }, [user]);

  interface CryptoData {
    name: string;
    logoUrl: string;
    price: number;
    percentChange: number;
  }

  const [ cryptoData, setCryptoData ] = useState<CryptoData[]>([]);
  const supportedCryptos = [
    "bitcoin",
    "ethereum",
    "ripple",
    "binancecoin",
    "crypto-com-chain",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const errorMessage = document.getElementById("errorMessage")!;
      const promises = supportedCryptos.map(async (cryptoId) => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}`
          );
          const data = await response.json();
          const crypto: CryptoData = {
            name: data.name,
            logoUrl: data.image.large,
            price: data.market_data.current_price.sgd,
            percentChange: data.market_data.price_change_percentage_24h,
          };
          return crypto;
        } catch (error) {
          console.error(`Error fetching data for ${cryptoId}:`, error);
          errorMessage.innerHTML =
            "Too many fetch requests, please try again later. (Sorry I'm broke I can't afford the subscription)";
          return null;
        }
      });

      const cryptoDataList = await Promise.all(promises);
      setCryptoData(
        cryptoDataList.filter((crypto) => crypto !== null) as CryptoData[]
      );
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-10">
      <div className="flex flex-col items-center space-y-5">

        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -15, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">
            Prices
          </h1>
          <Image
            src="/images/BTCwCandles.png"
            alt="BTC with Candles"
            width={48}
            height={48}
          />
        </motion.div>

        <div className={`p-2 rounded shadow-md max-w-[30rem] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          {cryptoData.map((crypto, index) => (<>
            <div className={`p-2 flex justify-center rounded shadow-md max-w-[30rem] ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <div className="flex items-center space-x-5">
                <div key={index} className="relative w-24 h-24 overflow-hidden rounded-md">
                  <Image src={crypto.logoUrl} alt={`${crypto.name} logo`} fill style={{ objectFit: 'cover'}}/>
                </div>
                <div className="flex flex-col items-left">
                  <h1 className="text-2xl font-bold">
                    {crypto.name}
                  </h1>
                  <h2 className="text-lg">
                    Price: <span className="font-bold">{crypto.price.toFixed(2)} SGD</span>
                  </h2>
                  {crypto.percentChange > 0 ? (
                      <h3 className="text-lg">24h Change: <span className="text-green-600 font-bold">{crypto.percentChange.toFixed(2)}%</span></h3>
                    ):(
                      <h3 className="text-lg">24h Change: <span className="text-red-600 font-bold">{crypto.percentChange.toFixed(2)}%</span></h3>
                    )}
                </div>
              </div>
            </div>
            <div className="h-2"></div>
          </>))}
          <h3 className="text-lg font-md" id="errorMessage"></h3>
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-950 dark:border-black/40 dark:bg-opacity/75">
          <h1 className="text-sm font-bold text-center">
            Powered by CoinGecko
          </h1>
        </div>
      </div>

      <div className="h-16"></div>
    </main>
  );
}
