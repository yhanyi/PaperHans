"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/theme_context";
import ErrorPopUp from "../../components/ErrorPopUp";

const SignIn = () => {
  // Miscellaneous.
  const router = useRouter();
  const { theme } = useTheme();

  // User fields.
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  // Firebase.
  const [ signInWithEmailAndPassword ] = useSignInWithEmailAndPassword(auth);

  // For Error handling, throw ErrorPopUp.
  const [ error, setError ] = useState("");

  const handleSignIn = async () => {
    try {
      if (email == "" || password == "") {
        throw new Error("please fill in all required fields.");
      }
      const res = await signInWithEmailAndPassword(email, password);
      // Check if User is valid.
      if (!(res && res.user)) {
        throw new Error("Invalid Credentials.");
      }
      console.log({ res });

      // Clear Email and Password after Sign In.
      setEmail("");
      setPassword("");

      // Redirect User to Home after successful Sign-In.
      router.push("/");
    } catch (e) {
      console.error(e);
      setError(e.message); // Set the error message to the state
    }
  };

  return (
    <div className="w-full px-8 py-12 md:py-20 flex flex-col items-center">
      <div className="bg-opacity-80 p-10 rounded-lg shadow-xl w-96 mb-5 transition-transform duration-300">
        <h1 className="text-2xl mb-5">Sign In</h1>
        {error && <ErrorPopUp message={error} onClose={() => setError("")} />}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-gray-300 text-gray-800 placeholder-gray-600'}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-gray-300 text-gray-800 placeholder-gray-600'}`}
        />
        <button
          onClick={handleSignIn}
          className={`w-full p-3 rounded ${theme === 'dark' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-indigo-500 text-white hover:bg-indigo-400'}`}
        >
          Sign In
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={() => router.push("/sign-up")}
          className="text-black-600 hover:underline"
        >
          New User? Click here to Sign-Up.
        </button>
      </div>
    </div>
  );
};

export default SignIn;