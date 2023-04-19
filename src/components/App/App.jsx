import { Flex, Spacer } from "@chakra-ui/react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <Flex direction="column" h="100vh" justifyContent="space-between">
      <Header />
      <Main />
      <Spacer />
      <Footer />
    </Flex>
  );
}

export default App;
