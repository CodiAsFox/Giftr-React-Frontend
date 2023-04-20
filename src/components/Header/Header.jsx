import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Image,
  Container,
} from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";

import Nav from "../Nav/Nav";
import Back from "../Back/Back";

export default function WithSubnavigation() {
  return (
    <Box
      bg={useColorModeValue("white", "blue.900")}
      color={useColorModeValue("gray.600", "white")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", xs: "row" }}
        spacing={4}
        justify={{ base: "center", xs: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <SkipNavLink zIndex={1}>Skip to content</SkipNavLink>

        <Flex flex={{ base: 1 }} justify={"flex-start"}>
          <Back />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "center" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "center" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          ></Text>
          <Image src="/logo.svg" w={185} />
        </Flex>

        <Stack
          flex={{ base: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Nav />
        </Stack>
      </Container>
    </Box>
  );
}
