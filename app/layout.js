import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gambling website",
  description: "explore the working of this game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={inter.className}>
        <div className=" bg-violet-950 ">
        {children}
        </div>
        </body>

      
    </html>
  );
}
