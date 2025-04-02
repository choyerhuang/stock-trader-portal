// TextInputField.tsx
// Reusable form input component with optional validation
// 🔒 Internal usage logic removed to comply with academic integrity policies

import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

// 🔒 Validation and error-binding logic omitted
const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
      <Form.Label>{label}</Form.Label>

      {/* 🔒 Input field registration logic removed */}
      <Form.Control
        {...props}
        // {...register(name, registerOptions)} // Removed for academic integrity
        isInvalid={false}
      />

      {/* 🔒 Error message display logic removed */}
      {/* <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback> */}
    </Form.Group>
  );
};

export default TextInputField;
