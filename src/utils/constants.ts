import { generatePKCE } from "../auth/Utility";

// Environment Variables
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;
export const SIGN_IN_OUT = `${import.meta.env.VITE_B2C_1_SIGNUPSIGNIN}&code_challenge_method=S256&code_challenge=${await generatePKCE()}`;
export const EDIT_PROFILE = import.meta.env.VITE_B2C_1_EDITUSERPROFILE;
export const PASSWORD_RESET = import.meta.env.VITE_B2C_1_PASSWORDRESET;

// Session Variable
export const SESSION_VALUES = {
  api_function_key: "API_TOKEN",
  chat: "desola_flight_chat_session"
}

// WebPages
export const WEB_PAGES = {
  home: "Home",
  contact: "Contact"
}

// Error and Success Messages
export const ERROR_MESSAGES = {
  network: "Network error. Please try again later.",
  unauthorized: "You are not authorized to access this resource.",
  notFound: "Requested resource not found.",
};
export const SUCCESS_MESSAGES = {
  saved: "Data has been successfully saved.",
  deleted: "Item has been successfully deleted.",
};
