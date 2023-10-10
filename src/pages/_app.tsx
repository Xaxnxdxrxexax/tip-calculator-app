import { type AppType } from "next/dist/shared/lib/utils";
import { Space_Mono } from "next/font/google";

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
});

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${space.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
