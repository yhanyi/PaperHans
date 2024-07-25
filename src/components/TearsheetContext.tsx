"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TearsheetContextType {
  tearsheetUrl: string;
  setTearsheetUrl: (url: string) => void;
  backtestStatus: string;
  setBacktestStatus: (status: string) => void;
  tearsheetStatus: string;
  setTearsheetStatus: (status: string) => void;
  showTearsheet: boolean;
  setShowTearsheet: (show: boolean) => void;
  tearsheetDone: boolean;
  setTearsheetDone: (done: boolean) => void;
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
  const [showTearsheet, setShowTearsheet] = useState<boolean>(false);
  const [tearsheetDone, setTearsheetDone] = useState<boolean>(false);
  return (
    <TearsheetContext.Provider
      value={{
        tearsheetUrl,
        setTearsheetUrl,
        backtestStatus,
        setBacktestStatus,
        tearsheetStatus,
        setTearsheetStatus,
        showTearsheet,
        setShowTearsheet,
        tearsheetDone,
        setTearsheetDone,
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
