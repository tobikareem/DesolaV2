import { useEffect, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10,15}$/;
const nameRegex = /^[A-Za-z\s'-]{2,}$/;

interface ValidationProps {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface focusedProps {
    firstname: boolean;
    lastname: boolean;
    email: boolean;
    phone: boolean;
    message: boolean;
}

export const useValidate = (data: {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  message: string;
}): { isValid: boolean; errors: 
    ValidationProps; 
    formData: ValidationProps; 
    setFormData: React.Dispatch<React.SetStateAction<ValidationProps>> 
    touched: focusedProps;
    setTouched: React.Dispatch<React.SetStateAction<focusedProps>>
} => {

  const [formData, setFormData] = useState<ValidationProps>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  const [touched, setTouched] = useState<focusedProps>({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    message: false,
  });



  const errors: ValidationProps = {};

  const validations = [
    {
      field: "firstname",
      condition: !data.firstname,
      errorMessage: "First name cannot be empty.",
    },
    {
      field: "firstname",
      condition: data.firstname && !nameRegex.test(data.firstname),
      errorMessage: "First name contains invalid characters.",
    },
    {
      field: "lastname",
      condition: !data.lastname,
      errorMessage: "Last name cannot be empty.",
    },
    {
      field: "lastname",
      condition: data.lastname && !nameRegex.test(data.lastname),
      errorMessage: "Last name contains invalid characters.",
    },
    {
      field: "message",
      condition: !data.message,
      errorMessage: "Message box cannot be empty.",
    },
    {
      field: "email",
      condition: data.email && !emailRegex.test(data.email),
      errorMessage: "Please enter a valid email address.",
    },
    {
      field: "phone",
      condition: data.phone && !phoneRegex.test(data.phone), 
      errorMessage: "Please enter a valid phone number.",
    },
  ];

  let isValid = true;

  for (const validation of validations) {
    if (validation.condition) {
      errors[validation.field as keyof ValidationProps] = validation.errorMessage;
      isValid = false;
    } else {
      errors[validation.field as keyof ValidationProps] = '';
    }
  }

  return { isValid, errors, formData, setFormData, touched, setTouched};
};
