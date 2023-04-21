import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import People from "../People/People";
import Person from "../Person/Person";
import Gifts from "../Gifts/Gifts";
import Gift from "../Gift/Gift";
import NotFound from "../NotFound/NotFound";
import { Box, Container, Stack } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";

const Main = () => {
  return (
    <SkipNavContent>
      <Container
        as={Stack}
        maxW={"5xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-arround" }}
        align={{ base: "center", md: "center" }}
      >
        <Box p={4} w="100%">
          <Routes>

            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Home />} index />
            <Route path="/people/" element={<People />} />
            <Route path="/people/:id/" element={<Person />} />
            <Route path={"/people/add"} element={<Person />} />
            <Route path="/people/:id/gifts/" element={<Gifts />} />
            <Route path="/people/:id/gifts/:giftId" element={<Gift />} />
            <Route path={"/people/:id/gifts/add"} element={<Gift />} />


          </Routes>
        </Box>
      </Container>
    </SkipNavContent>
  );
};

export default Main;
