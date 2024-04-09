// import "../styles/globals.css";
import { AuthProvider } from "../context/AuthProvider";
import { ChakraProvider, CSSReset  } from "@chakra-ui/react";
import { Providers } from "../Provider/Provider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Providers>
    </>
  );
}

export default MyApp;
