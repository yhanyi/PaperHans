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
    <form onSubmit={handleSubmit} className="gap-5 flex flex-row items-center">
      <input
        type="text"
        placeholder="Enter Alpaca API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
        required
      />
      <button
        type="submit"
        className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
      >
        Save API Key
      </button>
    </form>
  );
};

export default AlpacaKeyForm;
