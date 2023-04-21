import { Box, Button, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const DeleteConfirm = ({ isOpen, onClose, doDelete, gift }) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to delete {gift.txt}?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action will permanently delete the gift and all its data. This
            action is irreversible.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={doDelete}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteConfirm;
