import React from "react";
import Login from "../Login/Login";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Box,
  Text,
} from "@chakra-ui/react";
import HomeBoxes from "../HomeBox/HomeBox";
import CheckToken from "../../auth/CheckToken";

const Home = () => {
  return (
    <Box className="Home">
      <CheckToken />
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Welcome to Giftr!</Heading>
        </CardHeader>
        <CardBody>
          <Text>The number one place for all your gifting needs!</Text>
        </CardBody>
        <CardFooter>
          <Login label="Login with Google" colour="cyan" icon="true" />
        </CardFooter>
      </Card>
      <HomeBoxes />
    </Box>
  );
};

export default Home;
