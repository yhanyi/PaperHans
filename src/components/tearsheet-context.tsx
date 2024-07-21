"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TearsheetContextType {
  tearsheetUrl: string;
  setTearsheetUrl: (url: string) => void;
  backtestStatus: string;
  setBacktestStatus: (status: string) => void;
  tearsheetStatus: string;
  setTearsheetStatus: (status: string) => void;
}

const TearsheetContext = createContext<TearsheetContextType | undefined>(
  undefined
);

export const TearsheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tearsheetUrl, setTearsheetUrl] = useState<string>("");
  const [backtestStatus, setBacktestStatus] = useState<string>("idle");
  const [tearsheetStatus, setTearsheetStatus] = useState<string>("idle");

  return (
    <TearsheetContext.Provider
      value={{
        tearsheetUrl,
        setTearsheetUrl,
        backtestStatus,
        setBacktestStatus,
        tearsheetStatus,
        setTearsheetStatus,
      }}
    >
      {children}
    </TearsheetContext.Provider>
  );
};

export const useTearsheetContext = () => {
  const context = useContext(TearsheetContext);
  if (!context) {
    throw new Error(
      "useTearsheetContext must be used within a TearsheetProvider"
    );
  }
  return context;
};
