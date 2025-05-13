const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10,15}$/;
const nameRegex = /^[A-Za-z\s'-]{2,}$/;

import { toast } from 'react-toastify';

export const validateFormData = (data: {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
}): boolean => {
  if (!data.firstname || /^\s*$/.test(data.firstname)) {
    toast.error('First name cannot be empty.');
    return false;
  }

  if (!nameRegex.test(data.firstname)) {
    toast.error('First name contains invalid characters.');
    return false;
  }

  if (!data.lastname || /^\s*$/.test(data.lastname)) {
    toast.error('Last name cannot be empty.');
    return false;
  }

  if (!nameRegex.test(data.lastname)) {
    toast.error('Last name contains invalid characters.');
    return false;
  }

  if (!emailRegex.test(data.email)) {
    toast.error('Please enter a valid email address.');
    return false;
  }

  if (!phoneRegex.test(data.phone)) {
    toast.error('Please enter a valid phone number.');
    return false;
  }

  return true;
};
