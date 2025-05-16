export const validateFormData = (data: {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  message: string;
}): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10,15}$/;
  const nameRegex = /^[A-Za-z\s'-]{2,}$/;

  if (!data.firstname.trim()) {
    errors.firstname = 'First name cannot be empty.';
  } else if (!nameRegex.test(data.firstname)) {
    errors.firstname = 'First name contains invalid characters.';
  }

  if (!data.lastname.trim()) {
    errors.lastname = 'Last name cannot be empty.';
  } else if (!nameRegex.test(data.lastname)) {
    errors.lastname = 'Last name contains invalid characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email cannot be empty.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email address.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number cannot be empty.';
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = 'Invalid phone number.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message cannot be empty.';
  }

  return errors;
};
