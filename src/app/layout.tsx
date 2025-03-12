import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${calSans.variable}`}>
        <Background />
        {children}
      </body>
    </html>
  );
}

function Background() {
  return (
    <div className="-z-50 fixed top-0 left-0">
      <div className="sticky top-0 left-0 h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-muted-foreground/15" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-[--y] left-[--x] z-[-1] h-56 w-56 rounded-full bg-gradient-radial from-0% from-muted-foreground/40 to-90% to-transparent blur-md" />
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="dotted-pattern"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="black" />
            </pattern>
            <mask id="dots-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="hsl(var(--background))"
            mask="url(#dots-mask)"
          />
        </svg>
      </div>
    </div>
  );
}
