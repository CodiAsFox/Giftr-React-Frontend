import { Box, FormLabel, Input, Text, Skeleton } from "@chakra-ui/react";

const DateField = ({ person, setPerson, loading, errors }) => {
  return (
    <Box py={2}>
      <Skeleton isLoaded={!loading}>
        <FormLabel>Birthdate</FormLabel>
        <Input
          placeholder="Select Date and Time"
          _placeholder={{ opacity: 0.5, color: "blue.100" }}
          size="md"
          type="date"
          id="dob"
          name="dob"
          pattern="\d{4}-\d{2}-\d{2}"
          value={`${person.dob}`}
          onChange={(ev) => setPerson({ ...person, dob: ev.target.value })}
          required
        />
        {errors.dob && <Text color="red.300">{errors.dob}</Text>}
      </Skeleton>
    </Box>
  );
};

export default DateField;
