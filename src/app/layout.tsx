import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import ThemeContextProvider from "@/components/theme_context";
import ThemeSwitch from "@/components/theme_switch";
import ActiveSectionContextProvider, {
  ActiveSectionContext,
} from "@/components/ActiveSectionContext";
import { TearsheetProvider } from "@/components/tearsheet-context";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaperHans",
  description: "Your new one-stop crypto webapp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <TearsheetProvider>
              <Header />
              <ToastContainer position="top-right" autoClose={5000} />
              {children}
              <ThemeSwitch />
            </TearsheetProvider>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
