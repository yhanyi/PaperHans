import AuthButton from "../components/AuthButton";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <AuthButton />
      <div className="w-full px-8 py-12 md:py-20 flex flex-col items-center">
        <h1 className="text-center text-4xl md:text-6xl max-w-xl font-semibold">
          PaperHans
        </h1>
        <p className="text-center max-w-xl my-6">
          Your new one stop crypto webapp!
        </p>
        <p>
          <Image src="/images/BTCwCandles.png" alt="BTC with Candles" width={250} height={250} object-fit="cover"/>
        </p>
        <button className="bg-indigo-600 text-white text-base md:text-lg font-medium px-8 py-2 shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
          Explore
        </button>
      </div>
    </main>
  );
}
