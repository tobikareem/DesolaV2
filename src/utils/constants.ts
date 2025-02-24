// Environment Variables
export const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
export const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;

// Azure policy
export const AZURE_B2C = {
  EDIT_PROFILE: import.meta.env.VITE_B2C_1_EDITUSERPROFILE,
  PASSWORD_RESET: import.meta.env.VITE_B2C_1_PASSWORDRESET,
  SIGN_IN_OUT: import.meta.env.VITE_B2C_1_SIGNUPSIGNIN
}


// Session Variable
export const SESSION_VALUES = {
  api_function_key: "api_function_key_token",
  chat: "desola_flight_chat_session",
  azure_b2c_authorizationCode: "azure_b2c_authorizationCode",
  azure_b2c_accessToken: "azure_b2c_accessToken",
  azure_b2c_idToken: "azure_b2c_idToken",
  azure_b2c_refreshToken: "azure_b2c_refreshToken",
  azure_b2c_refreshTokenExpiresAt: "azure_b2c_refreshToken_expiresAt",
  azure_b2c_expiresAt: "azure_b2c_expireAt",
  azure_b2c_user: "azure_b2c_user",
  azure_b2c_userId: "azure_b2c_userId",
  azure_b2c_userEmail: "azure_b2c_userEmail",
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
