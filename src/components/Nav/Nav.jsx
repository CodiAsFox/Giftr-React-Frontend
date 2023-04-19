import IsLogged from "../../auth/IsLogged";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { useLocation } from "react-router-dom";
import { Button, Tooltip, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faGift,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  // const { id, giftId } = useParams(); // not working

  // const location = useLocation();
  // console.log(location[1]);

  // const path = location.pathname.split("/");

  // const isPeoplePage = path.includes("people");
  // const isGiftsPage = path.includes("gifts");
  // const isAddPage = path.includes("add");

  // console.log(
  //   "id",
  //   id,
  //   "giftId",
  //   giftId,
  //   "isPeoplePage",
  //   isPeoplePage,
  //   "isGiftsPage",
  //   isGiftsPage,
  //   "isAddPage",
  //   isAddPage
  // );

  // if (isPeoplePage && isGiftsPage && !isAddPage) {
  //   console.log("You are in Gifts!");
  // }
  // if (isPeoplePage && !isGiftsPage && !isAddPage && !id) {
  //   console.log("You are in people");
  // }
  // if (isPeoplePage && !isGiftsPage && isAddPage) {
  //   console.log("You are in add people");
  // }
  // if (isPeoplePage && isGiftsPage && isAddPage) {
  //   console.log("You are in add gifts");
  // }
  // if (isPeoplePage && isGiftsPage && !isAddPage && id && !giftId) {
  //   console.log("You are in edit person");
  // }
  // if (isPeoplePage && isGiftsPage && !isAddPage && id && giftId) {
  //   console.log("You are in edit gift");
  // }

  /* TODO:
  /people
    Add person and logout 
  
  /people/:id people/add
    Back Logout
  
  /people/:id/gifts
   Back Add gift
  
  /people/:id/gifts/add
    Back Logout
  
  /people/:id/gifts/:giftid
    Back Logout
  */
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
  return IsLogged() ? (
    <Box className="main-menu">
      <Button as={"a"} bg="cyan.600" fontSize={"lg"} href={"/people"} mr={3}>
        <FontAwesomeIcon icon={faPeopleGroup} color="white" />
        <Text pl={2}>People</Text>
      </Button>
      <Button
        as={"a"}
        bg="green.700"
        fontSize={"lg"}
        href={"/people/add"}
        mr={3}
      >
        {/* <Tooltip label="Add Person" hasArrow bg="cyan.400" color="white"> */}
        <AddPersonIcon />
        {/* </Tooltip> */}
      </Button>
      <Button
        as={"a"}
        bg="green.700"
        fontSize={"lg"}
        //href={`${id}/gift/add`} // not working
        mr={3}
      >
        {/* <Tooltip label="Add Gift" hasArrow bg="cyan.400" color="white"> */}
        <AddGiftIcon />
        {/* </Tooltip> */}
      </Button>

      <Logout />
    </Box>
  ) : (
    <nav className="main-menu">
      <Login />
    </nav>
  );
};

export default Nav;
