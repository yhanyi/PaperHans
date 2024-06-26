import React, { useState } from "react";

export default function TearsheetViewer() {
  const [tearsheetUrl, setTearsheetUrl] = useState<string>("");

  const fetchTearsheet = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tearsheet?timestamp=${new Date().getTime()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tearsheet");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (tearsheetUrl) {
        URL.revokeObjectURL(tearsheetUrl);
      }
      setTearsheetUrl(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={fetchTearsheet}
        className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
      >
        View Tearsheet
      </button>
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
