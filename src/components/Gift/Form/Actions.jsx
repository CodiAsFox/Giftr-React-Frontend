import { Box } from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faTrash,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

const GiftActions = ({ giftId, saveGift, onOpen, personId, loading }) => {
  return (
    <Box className="formBox" pt={4}>
      <Button
        colorScheme="green"
        as={"a"}
        fontSize={"sm"}
        fontWeight={600}
        mr={3}
        onClick={saveGift}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        <Text pl={1}>Save</Text>
      </Button>
      {giftId ? (
        <>
          <Button
            colorScheme="red"
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            mr={3}
            onClick={onOpen}
          >
            <FontAwesomeIcon icon={faTrash} />
            <Text pl={1}>Delete</Text>
          </Button>
        </>
      ) : (
        <Button
          colorScheme="red"
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          mr={3}
          href={`/people/${personId}/gifts/`}
        >
          <FontAwesomeIcon icon={faRectangleXmark} />
          <Text pl={1}>Cancel</Text>
        </Button>
      )}
    </Box>
  );
};

export default GiftActions;
