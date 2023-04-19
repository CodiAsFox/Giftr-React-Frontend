import { Button, Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const Back = () => {
  const { id } = useParams(); // not working
  return (
    <Box>
      <Button
        colorScheme="cyan"
        as={"a"}
        href={"/people"}
        fontSize={"sm"}
        fontWeight={600}
        mr={3}
      >
        <FontAwesomeIcon icon={faLeftLong} />
        <Text pl={1}>Back</Text>
      </Button>
    </Box>
  );
};

export default Back;
