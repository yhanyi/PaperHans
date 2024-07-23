"use client";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const AuthButton = () => {
  
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {user ? (
        <div className="flex flex-col items-center w-32">
          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 text-white text-base md:text-sm font-medium py-1 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all w-24">
            Log Out
          </button>
          <h1 className="text-xs mt-2">
            Welcome {user.displayName || "User"}!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center w-32">
          <button
          onClick={() => router.push("/sign-in")}
          className="bg-indigo-600 text-white text-base md:text-sm font-medium py-1 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all w-24">
          Sign In
          </button>
          <h1 className="text-xs mt-2">
              To access all features!
          </h1>
        </div>
      )}
    </motion.div>
  );
};

export default AuthButton;
