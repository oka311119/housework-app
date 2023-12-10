"use client";

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { ScheduleList } from "./_components/schedule/schedule-list";

export default function Page() {
  return (
    <Flex w="100%" h="100vh" direction="column" align="center">
      <Box position="fixed" right={5} top={5} zIndex={10}>
        <Button variant="ghost">
          <Link href="/housework">家事一覧</Link>
        </Button>
      </Box>
      <Box w={"100%"} flex="1" overflowY="scroll" p={4} bg={"whitesmoke"}>
        <ScheduleList />
      </Box>
    </Flex>
  );
}
