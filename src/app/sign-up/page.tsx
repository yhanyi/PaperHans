"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/theme_context";
import { setDoc, doc, collection } from "firebase/firestore";
import ErrorPopUp from "../../components/ErrorPopUp";
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const SignUp = () => {
  // Miscellaneous.
  const router = useRouter();
  const { theme } = useTheme();

  // User fields.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Firebase.
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const achievementsRef = collection(db, "achievements");

  // For Error handling, throw ErrorPopUp.
  const [error, setError] = useState("");

  // Prevent user from clicking "Sign-Up" button while waiting for Firebase to create new User.
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async () => {
    try {
      // Start sign-up process.
      setIsSigningUp(true);

      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        confirmEmail === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        throw new Error("Please fill in all the required fields.");
      } else if (email !== confirmEmail) {
        throw new Error("Emails do not match!");
      } else if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      } else if (!validateEmail(email)) {
        throw new Error("Invalid email!");
      } else if (!validatePassword(password)) {
        throw new Error(
          "Password requirements not met! Minimum of 8 characters, and Special (e.g. ! @ # $), Uppercase, Lowercase characters required."
        );
      }

      const res = await createUserWithEmailAndPassword(email, password);
      if (res && res.user) {
        await updateProfile(res.user, {
          displayName: `${firstName} ${lastName}`,
        });

        await setDoc(doc(achievementsRef, res.user.uid), {
          nAchievements: 1,
          createdAccount: true,
          tryToggleTheme: false,
          visitedAbout: false,
          visitedPrices: false,
          visitedPlayground: false,
          visitedNews: false,
          visitedProfile: false,
          learnBTC: false,
          learnETH: false,
          learnXRP: false,
          learnBNB: false,
          learnCRO: false
        });
        toast.success("Achievement Unlocked! Create a PaperHans account.");
      } else {
        // 400 Bad Request likely caused by using the same email.
        throw new Error("Email is already in use!");
      }
      console.log({ res });

      // Clear fields after successful sign-up
      setFirstName("");
      setLastName("");
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect user to Home after successful sign-up
      router.push("/");
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="w-full px-8 py-12 md:py-8 flex flex-col items-center">
      <div className="bg-opacity-80 p-10 rounded-lg shadow-xl w-96 mb-5">
        <h1 className="text-2xl mb-5">Sign Up</h1>
        {error && <ErrorPopUp message={error} onClose={() => setError("")} />}
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 pr-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-3 rounded outline-none ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-300 text-gray-800 placeholder-gray-600"
              }`}
            />
          </div>
          <div className="w-full md:w-1/2 pl-2">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-3 rounded outline-none ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-300 text-gray-800 placeholder-gray-600"
              }`}
            />
          </div>
        </div>
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
          type="email"
          placeholder="Confirm Email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none ${
            theme === "dark"
              ? "bg-gray-700 text-white placeholder-gray-500"
              : "bg-gray-300 text-gray-800 placeholder-gray-600"
          }`}
        />
        <button
          onClick={handleSignUp}
          disabled={isSigningUp}
          className={`w-full p-3 rounded ${
            theme === "dark"
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-indigo-500 text-white hover:bg-indigo-400"
          }`}
        >
          {isSigningUp ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={() => router.push("/sign-in")}
          className="text-black-600 hover:underline"
        >
          Existing User? Click here to Sign-In.
        </button>
      </div>
    </div>
  );
};

// Password must contain a minimum of 8 characters, a Special character, an Upper and a Lowercase character to be considered valid.
function validatePassword(password: string) {
  const lengthRegex = /.{8,}/; // At least 8 characters
  const specialCharRegex = /[^A-Za-z0-9]/; // Contains a special character
  const upperCaseRegex = /[A-Z]/; // Contains an uppercase letter
  const lowerCaseRegex = /[a-z]/; // Contains a lowercase letter

  // Check individual password conditions.
  const hasValidLength = lengthRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);
  const hasUpperCase = upperCaseRegex.test(password);
  const hasLowerCase = lowerCaseRegex.test(password);

  // Check if all password conditions have been met.
  return hasValidLength && hasSpecialChar && hasUpperCase && hasLowerCase;
}

// Email must be in the format xxxx@xxx.xxx to be considered valid.
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email conditions have been met.
  return emailRegex.test(email);
}

export default SignUp;
