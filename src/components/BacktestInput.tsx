import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTearsheetContext } from "@/components/TearsheetContext";
import { Tooltip, IconButton } from "@mui/material";
import { getAuth } from "firebase/auth";
import { app } from "@/app/firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAlpacaKeys = async (userId: string) => {
  const db = getFirestore(app);
  const docRef = doc(db, "alpacaKeys", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { apiKey: data.apiKey, apiSecret: data.apiSecret };
  } else {
    throw new Error("Alpaca API Key or Secret not found.");
  }
};

export default function BacktestInput() {
  const { setTearsheetDone } = useTearsheetContext();
  const [symbol, setSymbol] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [benchmark, setBenchmark] = useState<string>("");
  const [cashAtRisk, setCashAtRisk] = useState<string>("");
  const [response, setResponse] = useState<number | string>("");

  const handleTradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleBenchmarkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBenchmark(event.target.value);
  };

  const handleCashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCashAtRisk(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please sign in to run a backtest.");
      return;
    }
    toast.info(
      "Backtest is running, you will be notified when it's done. Estimated time: 2 minutes."
    );
    try {
      const { apiKey, apiSecret } = await getAlpacaKeys(user.uid);
      console.log("Sending request...", apiKey, apiSecret);
      const response = await fetch(`${apiBaseUrl}/api/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          year,
          benchmark,
          cashAtRisk,
          apiKey,
          apiSecret,
        }),
      });
      console.log("Response received:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
      const data = await response.json();
      if (data.error) {
        toast.error("An error occurred: " + data.error);
      } else {
        toast.success(
          "Backtest complete! Check the playground page again to view the tearsheet."
        );
        setTearsheetDone(true);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="gap-5 flex flex-row items-center">
          <div className="gap-1 flex flex-row items-center justify-center">
            <p>Enter your trading symbol:</p>
            <Tooltip
              className="dark:text-white text-black"
              title="A unique identifier for the asset or stock you wish to backtest. For example, 'SPY' represents the SPDR S&P 500 ETF."
            >
              <IconButton>ℹ️</IconButton>
            </Tooltip>
          </div>
          <input
            type="text"
            value={symbol}
            onChange={handleTradeChange}
            placeholder="Default: SPY"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center">
          <div className="gap-1 flex flex-row items-center justify-center">
            <p>Enter the year you want to backtest on:</p>
            <Tooltip
              className="dark:text-white text-black"
              title="Select the specific year you want to analyze for your trading strategy. Backtesting allows you to simulate trades based on historical data from this chosen year."
            >
              <IconButton>ℹ️</IconButton>
            </Tooltip>
          </div>
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="Default: 2023"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center justify-center">
          <div className="gap-1 flex flex-row items-center justify-center">
            <p>Enter your benchmark asset/stock:</p>
            <Tooltip
              className="dark:text-white text-black"
              title="Compare your trading strategy against a benchmark asset or stock. This could be another ETF or stock index like 'QQQ' (PowerShares QQQ Trust)"
            >
              <IconButton>ℹ️</IconButton>
            </Tooltip>
          </div>

          <input
            type="text"
            value={benchmark}
            onChange={handleBenchmarkChange}
            placeholder="Default: SPY/QQQ"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center">
          <div className="gap-1 flex flex-row items-center justify-center">
            <p>Enter your cash-at-risk proportion:</p>
            <Tooltip
              className="dark:text-white text-black"
              title="Determines the portion of your total capital that you're willing to risk on each trade. The default value of 0.5 means risking 50% of your capital on each trade."
            >
              <IconButton>ℹ️</IconButton>
            </Tooltip>
          </div>
          <input
            type="text"
            value={cashAtRisk}
            onChange={handleCashChange}
            placeholder="Default: 0.5"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>
        <button
          type="submit"
          className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
        >
          Submit
        </button>
      </form>
      {response !== "" && <p>{response}</p>}
    </div>
  );
}
