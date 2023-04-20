import IsLogged from "../../auth/IsLogged";
import Logout from "../Logout/Logout";
import { Button, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { usePage } from "../../context/PageContext";

const Nav = () => {
  const [page] = usePage();

  const AddGiftIcon = () => {
    return (
      <>
        <FontAwesomeIcon icon={faGift} />
        <FontAwesomeIcon icon={faPlus} />
      </>
    );
  };
  const AddPersonIcon = () => {
    return (
      <>
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faPlus} />
      </>
    );
  };

  const AddPerson = () => {
    return page.page == "people" ? (
      <Button
        as={"a"}
        bg="green.700"
        fontSize={"lg"}
        href={"/people/add"}
        mr={3}
      >
        <AddPersonIcon />
      </Button>
    ) : (
      <></>
    );
  };
  const AddGift = () => {
    return page.page == "gifts" ? (
      <Button
        as={"a"}
        bg="green.700"
        fontSize={"lg"}
        href={`/people/${page.id}/gifts/add`}
        mr={3}
      >
        <AddGiftIcon />
      </Button>
    ) : (
      <></>
    );
  };
  return IsLogged() ? (
    <Box className="main-menu">
      <AddPerson />
      <AddGift />
      <Logout />
    </Box>
  ) : (
    <></>
  );
};

export default Nav;
