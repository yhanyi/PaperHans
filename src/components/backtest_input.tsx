import React, { useState } from "react";

export default function BacktestInput() {
  const [symbol, setSymbol] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [benchmark, setBenchmark] = useState<string>("");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, year, benchmark }),
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
    <div className="flex flex-col border-black border-1px border">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={symbol}
          onChange={handleTradeChange}
          placeholder="Enter trade symbol. (Example: SPY)"
        />
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter backtest year. (Example: 2023)"
        />
        <input
          type="text"
          value={benchmark}
          onChange={handleBenchmarkChange}
          placeholder="Enter benchmark asset. (Example: QQQ)"
        />
        <button type="submit" className="bg-gray-400 w-fit">
          Submit
        </button>
      </form>
      {response !== "" && <p>{response}</p>}
    </div>
  );
}
