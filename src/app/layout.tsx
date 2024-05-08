import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Offy-Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono h-screen">
        <div className="h-screen grid grid-cols-5 grid-rows-6 gap-5">
          <div className="row-start-1 row-end-6 col-start-1 col-end-2">
            <div className="m-3">
              <Image
                className="rounded-full"
                src="https://avatars.githubusercontent.com/u/96122242?v=4"
                width={500}
                height={500}
                alt="Logo"
              />
            </div>
            <div className="my-6 mx-4">
              <div className="text-xl my-2">DASHBOARD</div>
              <div className="text-xl my-2">CUSTOMERS</div>
              <div className="text-xl my-2">PRODUCTS</div>
              <div className="text-xl my-2">ORDERS</div>
              <div className="text-xl my-2">REPORT</div>
            </div>
          </div>
          <div className="row-start-6 row-end-7 col-start-1 col-end-2">
            <div className="mt-12 w-full flex items-center">
              {/* not sure about margin for this profile is this is good  */}
              <div className="mx-3 w-9">
                <Image
                  className="rounded-full"
                  src="https://avatars.githubusercontent.com/u/96122242?v=10"
                  width={100}
                  height={100}
                  alt="Logo"
                />
              </div>
              <p>John Doe</p>
            </div>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
