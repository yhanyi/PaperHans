import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTearsheetContext } from "./tearsheet-context";

export default function TearsheetViewer() {
  const {
    tearsheetUrl,
    setTearsheetUrl,
    backtestStatus,
    setBacktestStatus,
    tearsheetStatus,
  } = useTearsheetContext();
  const [showTearsheet, setShowTearsheet] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrl = window.localStorage.getItem("tearsheetUrl") || "";
      setTearsheetUrl(savedUrl);
    }
  }, [setTearsheetUrl]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/status`);
        const data = await response.json();
        setBacktestStatus(data.status);

        if (data.status === "complete") {
          setShowTearsheet(true);
        } else if (data.status === "error") {
          toast.error("An error occurred during backtest");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (backtestStatus === "running") {
      const interval = setInterval(checkStatus, 1000);
      return () => clearInterval(interval);
    }
  }, [backtestStatus, setBacktestStatus, setTearsheetUrl]);

  const fetchTearsheet = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tearsheet?timestamp=${new Date().getTime()}`
      );
      if (!response.ok) {
        toast.error("Error fetching tearsheet: " + response.statusText);
        throw new Error("Failed to fetch tearsheet");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (tearsheetUrl) {
        URL.revokeObjectURL(tearsheetUrl);
      }
      setTearsheetUrl(url);
      localStorage.setItem("tearsheetUrl", url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadTearsheet = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tearsheet?timestamp=${new Date().getTime()}`
      );
      if (!response.ok) {
        toast.error("Error downloading tearsheet: " + response.statusText);
        throw new Error("Failed to fetch tearsheet");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tearsheet.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearCache = () => {
    setTearsheetUrl("");
    setShowTearsheet(false);
    toast.success("Cache cleared!");
  };

  return (
    <div className="flex flex-col w-screen gap-20">
      <div className="flex flex-row gap-10 items-center justify-center">
        <button
          onClick={fetchTearsheet}
          className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
        >
          View Tearsheet
        </button>
        <button
          onClick={downloadTearsheet}
          className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
        >
          Download Tearsheet
        </button>
        <button
          onClick={clearCache}
          className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
        >
          Clear Cache
        </button>
      </div>
      {tearsheetUrl && (
        <iframe
          src={tearsheetUrl}
          title="Tearsheet"
          width="100%"
          height="600px"
        ></iframe>
      )}
    </div>
  );
}
