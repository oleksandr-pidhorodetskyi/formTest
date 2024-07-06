// src/validationConfig.ts
interface ValidationRule {
  name: string;
  pattern: RegExp;
  required: boolean;
  errorMessage: string;
  example?: string;
}

interface ValidationConfig {
  [key: string]: ValidationRule;
}

const validationConfig: ValidationConfig = {
  firstName: {
    name: "First name",
    pattern: /^.+$/,
    required: true,
    errorMessage: "First name is required.",
  },
  lastName: {
    name: "Last name",
    pattern: /^.+$/,
    required: true,
    errorMessage: "Last name is required.",
  },
  emailAddress: {
    name: "Email address",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
    errorMessage: "Please use correct formatting.",
    example: "address@email.com",
  },
};

export default validationConfig;
