import "../styles/globals.css";
import {Inter, Rubik} from "next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rubik = Rubik({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export default function RootLayout({children}) {
  return (
    <html lang="en" className={`${inter.variable} ${rubik.variable}`}>
    <body>
    <div className={'content'}>
      {children}
    </div>
    </body>
    </html>
  );
}
