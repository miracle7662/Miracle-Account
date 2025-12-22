// src/hooks/useFormValidator.ts
import { useState } from 'react';

type ValidationFn = (value: string) => string;
type ErrorMap = { [fieldName: string]: string };

export const useFormValidator = () => {
  const [errors, setErrors] = useState<ErrorMap>({});

  const validateField = (
    fieldName: string,
    value: string,
    rules: ValidationFn[]
  ): boolean => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return false;
      }
    }
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[fieldName];
      return copy;
    });
    return true;
  };

  const validateForm = (
    fields: { [fieldName: string]: { value: string; rules: ValidationFn[] } }
  ): boolean => {
    let isValid = true;
    for (const key in fields) {
      const { value, rules } = fields[key];
      const fieldValid = validateField(key, value, rules);
      if (!fieldValid) isValid = false;
    }
    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm,
  };
};

export default useFormValidator;