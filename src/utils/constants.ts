// Environment Variables
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_TOKEN = import.meta.env.VITE_API_TOKEN;


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
