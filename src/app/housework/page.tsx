"use client";

import { Box, Flex } from "@chakra-ui/react";
import { HouseWorkForm } from "../_components/housework/housework-form";
import { HouseWorkList } from "../_components/housework/housework-list";
import { HouseWorkProvider } from "../_components/housework/context";

export default function HouseWorkPage() {
  return (
    <HouseWorkProvider>
      <Box bg="whitesmoke" minH="100vh">
        <Flex direction="row" p={4} bg={"whitesmoke"}>
          <Box flex="0.7" overflowY="scroll">
            <HouseWorkList />
          </Box>
          <Box flex="0.3">
            <HouseWorkForm />
          </Box>
        </Flex>
      </Box>
    </HouseWorkProvider>
  );
}
