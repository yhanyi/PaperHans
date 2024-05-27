import React, { useState } from "react";

export default function UserInput() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [response, setResponse] = useState<number | string>("");

  const handleNum1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum2(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1, num2 }),
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={num1}
          onChange={handleNum1Change}
          placeholder="Enter first number"
        />
        <input
          type="text"
          value={num2}
          onChange={handleNum2Change}
          placeholder="Enter second number"
        />
        <button type="submit">Submit</button>
      </form>
      {response !== "" && <p>Sum: {response}</p>}
    </div>
  );
}
