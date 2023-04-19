import NavItem from "../NavItem/NavItem";
import IsLogged from "../../auth/IsLogged";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { Button } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';

const Nav = () => {
  const { id } = useParams(); // not working
  return IsLogged() ? (
    <nav className="main-menu">
      <Button
        colorScheme="teal"
        as={"a"}
        fontSize={"sm"}
        fontWeight={600}
        href={"/people"}
        mr={3}
      >
        People
      </Button>
      <Button
        colorScheme="teal"
        as={"a"}
        fontSize={"sm"}
        fontWeight={600}
        href={"/people/add"}
        mr={3}
      >
        Add person
      </Button>
      <Button
        colorScheme="teal"
        as={"a"}
        fontSize={"sm"}
        fontWeight={600}
        href={`${id}/gift/add`} // not working
        mr={3}
      >
        Add gift
      </Button>

      <Logout />
    </nav>
  ) : (
    <nav className="main-menu">
      <Login />
    </nav>
  );
};

export default Nav;
