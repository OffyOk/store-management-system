import type { Metadata } from "next";
import Nav from "./components/nav";
import Image from "next/image";
import Link from "next/link";
import "./styles/globals.css";
import "./styles/variables.css";
// import NavToggle from "@/app/components/_navToggle";

export const metadata: Metadata = {
  title: "Store-admin-offyok",
  description:
    "practice web-development use nextjs, tailwind, typescript and deploy on vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black">
        <Nav />
        <div id="scene" className="h-screen z-0 flex pt-16 overflow-hidden">
          <div className="relative w-full h-full overflow-y-auto lg:ml-64  bg-slate-100 dark:bg-indigo-950/50">
            <main>
              <div className="h-screen px-4 pt-6">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
