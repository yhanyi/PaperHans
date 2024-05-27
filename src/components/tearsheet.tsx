import React, { useState } from "react";

export default function TearsheetDisplay() {
  const [tearsheetUrl, setTearsheetUrl] = useState<string>("");

  const fetchTearsheet = async () => {
    console.log("FETCHING");
    try {
      const response = await fetch("http://127.0.0.1:8000/tearsheet");
      if (!response.ok) {
        throw new Error("Failed to fetch tearsheet");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setTearsheetUrl(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchTearsheet}>View Tearsheet</button>
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
