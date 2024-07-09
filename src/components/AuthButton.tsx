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
      className="flex items-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {user ? (
        <>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 text-white text-base md:text-lg font-medium px-4 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            Log Out
          </button>
          <p className="text-sm mt-2 text-right">
            Signed in as {user.displayName || "User"}.
          </p>
        </>
      ) : (
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-indigo-600 text-white text-base font-medium px-4 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          Sign In
        </button>
      )}
    </motion.div>
  );
};

export default AuthButton;
