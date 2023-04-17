import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import People from "../People/People";
import Person from "../Person/Person";
import Gifts from "../Gifts/Gifts";
import Gift from "../Gift/Gift";
import NotFound from "../NotFound/NotFound";
import { Box, Flex } from "@chakra-ui/react";

const Main = () => {
  return (
    <main className="container">
      <Box minHeight={"74.5vh"}>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/people/" element={<People />}>
            <Route path=":id" element={<Person />}></Route>
          </Route>
          <Route path="/people/:id/gifts/" element={<Gifts />}>
            <Route path=":giftId" element={<Gift />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </main>
  );
};

export default Main;
