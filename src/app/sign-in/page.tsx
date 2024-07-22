"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/theme_context";
import { FcGoogle } from 'react-icons/fc';
import ErrorPopUp from "../../components/ErrorPopUp";

const SignIn = () => {
  // Miscellaneous.
  const router = useRouter();
  const { theme } = useTheme();

  // User fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Firebase.
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // For Error handling, throw ErrorPopUp.
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      if (email == "" || password == "") {
        throw new Error("Please fill in all the required fields.");
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
    } catch (e: any) {
      console.error(e);
      setError(e.message); // Set the error message to the state.
    }
  };

  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (result.user) {
        console.log({ result });

        // Redirect User to Home after successful Sign-In.
        router.push("/");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message); // Set the error message to the state
    }
  };
  // Google branding guidelines https://developers.google.com/identity/branding-guidelines
  const buttonStyle = theme === "dark" 
    ? "bg-[#131314] text-[#E3E3E3] border-[#8E918F] border-2" 
    : "bg-[#FFFFFF] text-[#1F1F1F] border-[#747775] border-2";
  const textStyle = "font-medium text-[14px] leading-[20px]";

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
          className={`w-full p-3 mb-4 rounded outline-none ${
            theme === "dark"
              ? "bg-gray-700 text-white placeholder-gray-500"
              : "bg-gray-300 text-gray-800 placeholder-gray-600"
          }`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none ${
            theme === "dark"
              ? "bg-gray-700 text-white placeholder-gray-500"
              : "bg-gray-300 text-gray-800 placeholder-gray-600"
          }`}
        />
        <button
          onClick={handleSignIn}
          className={`w-full p-3 rounded bg-indigo-600 text-white hover:bg-indigo-500`}
        >
          Sign In
        </button>

        <div className="h-4"></div>
        <h1 className="text-sm font-medium">
          Alternative sign-in options:
        </h1>
        <button
          onClick={handleGoogleSignIn}
          className={`flex items-center justify-center w-full mt-4 rounded ${buttonStyle} ${textStyle} border hover:hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
        >
          <FcGoogle className="w-12 h-12 mr-2" />
          Sign In with Google
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
