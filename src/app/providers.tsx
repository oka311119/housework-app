"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
