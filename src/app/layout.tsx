/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Fahkwang } from "next/font/google";
import "./globals.css";
import ClientProvider from "./providers/ClientProvider";
import { ConfigProvider } from "antd";

const fahkwang = Fahkwang({
  weight: ["200", "300", "400", "500", "600", "700"], // Add or remove weights as needed
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Community Board",
  description: "DIR Cyber Community Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fahkwang.className} antialiased bg-blond`}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: fahkwang.style.fontFamily, // Set the global font using Fahkwang
            },
          }}
        >
          <ClientProvider>{children}</ClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
