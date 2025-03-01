"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter();

  return (
    <main>
      <div className="w-full px-8 py-12 md:py-20 flex flex-col items-center">
        <Image
          src="/images/PaperHans.png"
          alt="PaperHans Logo"
          width={72}
          height={72}
        />
        <h1 className="text-center text-4xl md:text-6xl max-w-xl font-semibold">
          PaperHans
        </h1>
        <p className="text-center max-w-xl my-6">
          Your new one stop crypto web app!
        </p>
        <button
          data-testid='about-us-button'
          onClick={() => {router.push("/aboutUs");}}
          className="bg-indigo-600 text-white text-base text-lg font-medium px-6 py-2 rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          About Us
        </button>
      </div>
    </main>
  );
}
