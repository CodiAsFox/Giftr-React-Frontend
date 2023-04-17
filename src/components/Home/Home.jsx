import React from "react";
import Login from "../Login/Login";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <section className="Home">
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
    </section>
  );
};

export default Home;
