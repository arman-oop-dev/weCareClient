import { InputGroup, Label, TextField } from "@heroui/react";

const NameFieldComponent = () => {
  return (
    <TextField className="w-full" name="fullname" isRequired>
      <Label className="text-sm text-content-primary">Enter your Name</Label>
      <InputGroup variant="secondary">
        <InputGroup.Input
          placeholder="Ariful Islam Arman"
          className="text-sm text-content-primary/80"
          name="fullname"
        />
      </InputGroup>
    </TextField>
  );
};

export default NameFieldComponent;
