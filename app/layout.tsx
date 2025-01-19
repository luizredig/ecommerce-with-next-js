import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./components/providers/AuthProvider";
import "./globals.css";
import CartProvider from "./components/providers/CartProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next Ecommerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex h-full flex-col">
          <AuthProvider>
            <CartProvider>
              <Header />

              <div className="flex-1 pt-20 md:pt-16">{children}</div>

              {/* <Footer /> */}
            </CartProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
