import { Box, Button, Text } from "@chakra-ui/react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "../../context/PageContext";

const Back = () => {
  const [page] = usePage();

  const currentPage = page.page;

  let ShowBack = false;
  let path = "/people";

  switch (currentPage) {
    case "gifts":
      ShowBack = true;
      break;
    case "gift/add":
      ShowBack = true;
      path = `/people/${page.id}/gifts`;
      break;
    case "people/add":
      ShowBack = true;
      break;
  }

  return ShowBack ? (
    <Box>
      <Button
        colorScheme="cyan"
        as={"a"}
        href={path}
        fontSize={"sm"}
        fontWeight={600}
        mr={3}
      >
        <FontAwesomeIcon icon={faLeftLong} />
        <Text pl={1}>Back</Text>
      </Button>
    </Box>
  ) : (
    <></>
  );
};

export default Back;
