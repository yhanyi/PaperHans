"use client"

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

interface CryptoData {
  name: string;
  logoUrl: string;
  price: number;
  percentChange: number;
}

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const supportedCryptos = ['bitcoin', 'ethereum', 'ripple', 'binancecoin', 'crypto-com-chain'];

  useEffect(() => {
    const fetchData = async () => {
      const promises = supportedCryptos.map(async (cryptoId) => {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
          const data = await response.json();
          const crypto: CryptoData = {
            name: data.name,
            logoUrl: data.image.large,
            price: data.market_data.current_price.sgd,
            percentChange: data.market_data.price_change_percentage_24h
          };
          return crypto;
        } catch (error) {
          console.error(`Error fetching data for ${cryptoId}:`, error);
          return null;
        }
      });

      const cryptoDataList = await Promise.all(promises);
      setCryptoData(cryptoDataList.filter((crypto) => crypto !== null) as CryptoData[]);
    };

    fetchData();
  }, []);

    return (
      <main className="flex flex-col gap-10">
        <motion.div
          className="fixed top-8 right-8 flex items-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold">Prices</h1>
          <Image src="/images/BTCwCandles.png" alt="BTC with Candles" width={48} height={48}/>
        </motion.div>
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl font-bold">Real-Time Cryptocurrency Prices</h1>
          {cryptoData.map((crypto, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={crypto.logoUrl} alt={`${crypto.name} logo`} width={60}/>
              <div>
                <h2 className="text-xl font-bold">{crypto.name}</h2>
                <p>Price: {crypto.price.toFixed(2)} SGD</p>
                <p>24h Change: {crypto.percentChange.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-950 dark:border-black/40 dark:bg-opacity/75">
            <h1 className="text-sm font-bold text-center">Powered by CoinGecko API.</h1>
          </div>
        </div>
      </main>
    );
};
