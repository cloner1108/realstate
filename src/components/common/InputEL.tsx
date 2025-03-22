"use client";

import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { englishOnly, numbersOnly, p2e } from "src/utils/Tools";

interface InputElProps {
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  isEnglish?: boolean;
  validate?: (value: string) => boolean; // Validation function
  errorMessage?: string; // Error message to display
}

const InputEl: React.FC<InputElProps> = ({
  label,
  type,
  placeholder = "",
  value,
  onChange,
  required = false,
  disabled = false,
  isEnglish = false,
  validate,
  errorMessage = "Invalid input", // Default error message
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true); // Track validation state
  const [isTouched, setIsTouched] = useState(false); // Track first touch of input state

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (inputValue: string) => {
    let processedValue = p2e(inputValue); // Convert Persian/Arabic numbers to English

    if (isEnglish || type === "email") {
      // Allow only English characters
      processedValue = englishOnly(processedValue); // Allow ٍjust English characters pointst English characters points
    }
    if (type === "number") {
      processedValue = numbersOnly(processedValue); // Allow numbers and decimal points
    }

    // Validate the input if a validation function is provided
    if (validate) {
      setIsValid(validate(processedValue));
    }

    onChange(processedValue);
  };

  return type === "password" ? (
    <FormControl
      variant="outlined"
      fullWidth
      margin="normal"
      error={!isValid} // Apply error state
    >
      <InputLabel htmlFor={label}>{`${label}${
        required ? " *" : ""
      }`}</InputLabel>
      <OutlinedInput
        id={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        sx={
          validate
            ? {
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      !isValid && isTouched
                        ? "red"
                        : isValid && isTouched
                        ? "green"
                        : "default", // Persistent border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      !isValid && isTouched
                        ? "red"
                        : isValid && isTouched
                        ? "green"
                        : "default", // Hover state
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      !isValid && isTouched
                        ? "red"
                        : isValid && isTouched
                        ? "green"
                        : "default", // Focused state
                  },
                },
              }
            : {}
        }
      />
      {!isValid && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  ) : (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      label={`${label}${required ? " *" : ""}`}
      type={type === "number" ? "text" : type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleInputChange(e.target.value)}
      disabled={disabled}
      error={!isValid} // Apply error state
      helperText={!isValid ? errorMessage : ""} // Show error message if invalid
      onBlur={() => {
        setIsTouched(true); // Mark the input as touched
        if (validate) {
          setIsValid(validate(value)); // Validate the input on blur
        }
      }}
      sx={
        validate
          ? {
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    !isValid && isTouched
                      ? "red"
                      : isValid && isTouched
                      ? "green"
                      : "default", // Persistent border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    !isValid && isTouched
                      ? "red"
                      : isValid && isTouched
                      ? "green"
                      : "default", // Hover state
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    !isValid && isTouched
                      ? "red"
                      : isValid && isTouched
                      ? "green"
                      : "default", // Focused state
                },
              },
            }
          : {}
      }
    />
  );
};

export default InputEl;
