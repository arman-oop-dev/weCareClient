"use client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";

const PasswordComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TextField
      className="w-full"
      name="password"
      isRequired
      validate={(value: string) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(value)) {
          return "Password must contain at least one number";
        }
        return null;
      }}
    >
      <Label className="text-sm text-content-primary">
        Enter your password
      </Label>
      <InputGroup variant="secondary">
        <InputGroup.Input
          placeholder="••••••••"
          className="text-sm text-content-primary/80"
          name="password"
          type={isVisible ? "text" : "password"}
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeSlash className="size-4" />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      <FieldError />
    </TextField>
  );
};

export default PasswordComponent;
