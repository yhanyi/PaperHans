import React, { useState } from "react";

export default function BacktestInput() {
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
    try {
      const response = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, year, benchmark, cashAtRisk }),
      });
      const data = await response.json();
      if (data.error) {
        setResponse(data.error);
      } else {
        setResponse(data.result);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred");
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="gap-5 flex flex-row items-center">
          <p>Enter your trading symbol:</p>
          <input
            type="text"
            value={symbol}
            onChange={handleTradeChange}
            placeholder="Default: SPY"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center">
          <p>Enter the year you want to backtest on:</p>
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="Default: 2023"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center">
          <p>Enter your benchmark asset/stock:</p>
          <input
            type="text"
            value={benchmark}
            onChange={handleBenchmarkChange}
            placeholder="Default: SPY/QQQ"
            className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          />
        </div>

        <div className="gap-5 flex flex-row items-center">
          <p>Enter your cash-at-risk proportion:</p>
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
