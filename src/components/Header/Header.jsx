import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import CheckToken from "../../auth/CheckToken";
import Nav from "../Nav/Nav";
import Back from "../Back/Back";

export default function WithSubnavigation() {
  return (
    <Box>
      <SkipNavLink zIndex={1}>Skip to content</SkipNavLink>
      <Flex
        bg={useColorModeValue("white", "blue.900")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"flex-start"}>
          <Back />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "center" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "center" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          ></Text>
          <Image src="./logo.svg" w={185} />
        </Flex>

        <Stack
          flex={{ base: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <CheckToken />
          <Nav />
        </Stack>
      </Flex>
    </Box>
  );
}
