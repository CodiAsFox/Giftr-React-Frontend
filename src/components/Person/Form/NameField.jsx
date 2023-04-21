import {
  Box,
  FormLabel,
  Input,
  Text,
  Skeleton,
  FormHelperText,
} from "@chakra-ui/react";

const NameField = ({ person, setPerson, loading, errors }) => {
  return (
    <Box py={2}>
      <Skeleton isLoaded={!loading}>
        <FormLabel>Person's name</FormLabel>
        <Input
          type="text"
          name="name"
          maxLength="80"
          placeholder="Person's name"
          _placeholder={{ opacity: 0.5, color: "blue.100" }}
          value={`${person.name}`}
          onChange={(ev) => {
            setPerson({ ...person, name: ev.target.value });
          }}
          required
        />
        {errors.name && <Text color="red.300">{errors.name}</Text>}

        <FormHelperText>E.g. Bob Robertson</FormHelperText>
      </Skeleton>
    </Box>
  );
};

export default NameField;
