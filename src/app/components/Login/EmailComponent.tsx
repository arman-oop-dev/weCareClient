"use client";
import { FieldError, InputGroup, Label, TextField } from "@heroui/react";

const EmailComponent = () => {
  return (
    <TextField
      className="w-full"
      name="email"
      isRequired
      validate={(value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Enter a valid email";
        }
        return null;
      }}
    >
      <Label className="text-sm text-content-primary">Enter your email</Label>
      <InputGroup variant="secondary">
        <InputGroup.Input
          placeholder="you@wecare.com"
          className="text-sm text-content-primary/80"
          name="email"
        />
      </InputGroup>
      <FieldError />
    </TextField>
  );
};

export default EmailComponent;
