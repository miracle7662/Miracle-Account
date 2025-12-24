export interface ValidationOptions {
  minLength?: number;
  maxLength?: number;
}

export const ValidationUtils = {
  // Validates alphabets only (including spaces and capitals)
  isAlpha(value: string, options?: ValidationOptions): boolean {
    if (!value) return false;
    
    if (!this.checkLength(value, options)) return false;
    
    const alphaRegex = /^[a-zA-Z\s]+$/;
    return alphaRegex.test(value);
  },

  // Validates numbers only
  isNumeric(value: string, options?: ValidationOptions): boolean {
    if (!value) return false;
    
    if (!this.checkLength(value, options)) return false;
    
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value);
  },

  // Validates alphanumeric characters
 isAlphaNumeric: (
  value: string,
  options?: { minLength?: number; maxLength?: number }
): boolean => {
  const regex = /^[A-Za-z0-9]+$/; // ✅ Only A-Z, a-z, 0-9 allowed
  const valid = regex.test(value);
  const lengthValid =
    (!options?.minLength || value.length >= options.minLength) &&
    (!options?.maxLength || value.length <= options.maxLength);
  return valid && lengthValid;
},

  // Validates email format
  isValidEmail(value: string, options?: ValidationOptions): boolean {
    if (!value) return false;
    
    if (!this.checkLength(value, options)) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  // Validates Indian phone number (+91 or 0 optional, followed by 10 digits)
  isValidIndianPhone(value: string, options?: ValidationOptions): boolean {
    if (!value) return false;
    
    // Remove any whitespace or hyphens
    const cleanValue = value.replace(/[\s-]/g, '');
    
    if (!this.checkLength(cleanValue, options)) return false;
    
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(cleanValue);
  },

  // Validates any string (allows alphabets, numbers, spaces, and special characters)
  isValidString(value: string, options?: ValidationOptions): boolean {
    if (!value) return false;
    
    if (!this.checkLength(value, options)) return false;
    
    // No regex restriction, as all characters are allowed
    return true;
  },

  // Internal helper to check min/max length
  checkLength(value: string, options?: ValidationOptions): boolean {
    if (options?.minLength && value.length < options.minLength) {
      return false;
    }
    if (options?.maxLength && value.length > options.maxLength) {
      return false;
    }
    return true;
  }
};