import "../styles/globals.css";
import type { AppProps } from "next/app";
import HeaderComponent from "../components/HeaderComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <HeaderComponent />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
