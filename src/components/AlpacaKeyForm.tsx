import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/app/firebase/config";
import { User } from "firebase/auth";

const db = getFirestore(app);

const AlpacaKeyForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [user, setUser] = useState<null | User>(null);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, "alpacaKeys", user.uid), { apiKey });
        alert("API Key saved successfully!");
      } catch (error) {
        console.error("Error saving API key:", error);
      }
    } else {
      alert("Please sign in first.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Alpaca API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        required
      />
      <button type="submit">Save API Key</button>
    </form>
  );
};

export default AlpacaKeyForm;
