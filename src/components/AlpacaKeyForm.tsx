import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { toast } from "react-toastify";

const db = getFirestore(app);

const AlpacaKeyForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [user, setUser] = useState<null | User>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, "alpacaKeys", user.uid), { apiKey, apiSecret });
        toast.success("Alpaca API Key and Secret saved successfully!");
        console.log(apiKey, apiSecret);
      } catch (error) {
        toast.error("Error saving Alpaca API Key and Secret: " + error);
      }
    } else {
      alert("Please sign in first.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="gap-5 flex flex-row items-center"
      >
        <input
          type="text"
          placeholder="Enter Alpaca API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          required
        />
        <input
          type="text"
          placeholder="Enter Alpaca API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          className="w-fit text-center bg-transparent border border-1px border-black dark:border-white rounded-xl p-1"
          required
        />
        <button
          type="submit"
          className="text-black dark:text-white w-fit p-1 rounded-lg border border-1 border-black dark:border-white"
        >
          Save Alpaca Keys
        </button>
      </form>
    </div>
  );
};

export default AlpacaKeyForm;
