import CoreApp from "@/classes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";

let init: CoreApp | null = null;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!init) {
      new CoreApp({ pageName: "Home" });
    }

    return () => {
      init = null;
    };
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js" />
    </>
  );
}
