export interface FormType {
  firstName: string;
  lastName: string;
  emailAddress: string;
  age: number;
  photo: File | null;
}

export type ErrorType = { message: string; example?: string };

export type FormErrors = {
  [K in keyof FormType]?: ErrorType;
};
