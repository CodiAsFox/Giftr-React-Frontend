import { Button, Text, Skeleton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faTrash,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

const PersonActions = ({ id, savePerson, onOpen, loading }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Button
        colorScheme="green"
        as={"a"}
        fontSize={"sm"}
        fontWeight={600}
        mr={3}
        onClick={savePerson}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        <Text pl={1}>Save</Text>
      </Button>
      {id ? (
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
      ) : (
        <Button
          colorScheme="red"
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          mr={3}
          href="/people"
        >
          <FontAwesomeIcon icon={faRectangleXmark} />
          <Text pl={1}>Cancel</Text>
        </Button>
      )}
    </Skeleton>
  );
};

export default PersonActions;
