import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAddDatabase,
  FcList,
  FcEnteringHeavenAlive,
  FcTwoSmartphones,
  FcApproval,
} from "react-icons/fc";

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function HomeBoxes() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Found the perfect gift? <br />
          Keep it safe with Giftr.
        </Heading>
        <Text color={"gray.300"} fontSize={{ base: "sm", sm: "lg" }}>
          You've finally found the perfect gift for that special someone, but
          how do you make sure you don't forget what it was or where you found
          it? With Giftr, you can keep all your gift ideas safe and organized in
          one place, so you'll never lose track of that perfect present again.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Unlimited People List"}
            icon={<Icon as={FcAddDatabase} w={10} h={10} />}
            description={
              "Create a list of all the important people in your life and easily keep track of the gifts you've given them in the past, as well as new gift ideas for future occasions."
            }
            href={"#"}
          />
          <Card
            heading={"Unlimited Gift Ideas"}
            icon={<Icon as={FcList} w={10} h={10} />}
            description={
              "With Giftr, you can add as many gift ideas as you want, so you'll always have a variety of options to choose from."
            }
          />
          <Card
            heading={"Cloud Save"}
            icon={<Icon as={FcEnteringHeavenAlive} w={10} h={10} />}
            description={
              "All your gift ideas are saved securely in the cloud, so you can access them from any device at any time."
            }
          />
          <Card
            heading={"Access in Multiple Devices"}
            icon={<Icon as={FcTwoSmartphones} w={10} h={10} />}
            description={
              "Whether you're using your phone, tablet, or computer, Giftr is easy to use and accessible across multiple devices."
            }
          />
          <Card
            heading={"Easy to Use"}
            icon={<Icon as={FcApproval} w={10} h={10} />}
            description={
              "Our user-friendly interface makes it easy to add, edit, and organize your gift ideas, so you can spend less time managing your lists and more time enjoying the gift-giving process."
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
