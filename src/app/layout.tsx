import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/auth/NextAuthProvider";

export const metadata: Metadata = {
  title: "Creatorsfy",
  description: "Monetize sua influência e acompanhe seu sucesso!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}