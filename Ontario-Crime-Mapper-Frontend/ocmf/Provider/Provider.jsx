"use client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme";
export function Providers({ children }) {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}