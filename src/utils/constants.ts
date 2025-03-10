// **Environment Variables**
export const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
export const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;

// **Azure AD B2C Configuration**
export const AZURE_B2C = {
    TENANT: import.meta.env.VITE_B2C_TENANT,
    CLIENT_ID: import.meta.env.VITE_B2C_CLIENT_ID,
    AUTHORITY: import.meta.env.VITE_B2C_AUTHORITY, 
    SIGNUP_SIGNIN_POLICY: import.meta.env.VITE_B2C_SIGNUP_SIGNIN_POLICY,
    PASSWORD_RESET_POLICY: import.meta.env.VITE_B2C_PASSWORD_RESET_POLICY,
    REDIRECT_URI: import.meta.env.VITE_B2C_REDIRECT_URI,
    APPLICATION_SCOPE: import.meta.env.VITE_B2C_APPLICATION_SCOPE,
    EDIT_USERPROFILE_POLICY: import.meta.env.VITE_B2C_EDIT_USERPROFILE_POLICY,
};

// **Session Storage Keys**
export const SESSION_VALUES = {
    api_function_key: "api_function_key_token",
    chat: "desola_flight_chat_session",
    azure_b2c_authorizationCode: "azure_b2c_authorizationCode",
    azure_b2c_accessToken: "azure_b2c_accessToken",
    azure_b2c_idToken: "azure_b2c_idToken",
    azure_b2c_refreshToken: "azure_b2c_refreshToken",
    azure_b2c_refreshTokenExpiresAt: "azure_b2c_refreshToken_expiresAt",
    azure_b2c_expiresAt: "azure_b2c_expiresAt",
    azure_b2c_user: "azure_b2c_user",
    azure_b2c_userId: "azure_b2c_userId",
    azure_b2c_family_name: "azure_b2c_family_name",
    azure_b2c_given_name: "azure_b2c_given_name",
    azure_name: "azure_name",
    azure_isAuthenticated: "azure_is_authenticated",
    azure_msal_token_keys: `msal.token.keys.${AZURE_B2C.CLIENT_ID}`,
    postLoginRedirectUrl: "post_login_redirect_url"
};

// **Web Page Routes**
export const WEB_PAGES = {
    home: "Home",
    contact: "Contact",
    chat: "chat",
    callback: "callback"
};

// **Error and Success Messages**
export const ERROR_MESSAGES = {
    network: "Network error. Please try again later.",
    unauthorized: "You are not authorized to access this resource.",
    notFound: "Requested resource not found.",
    loginFailed: "Login failed. Please try again.",
    passwordMismatch: "Password and confirm password do not match.",
    endpointsResolution: "Azure B2C endpoints could not be resolved."
};

export const SUCCESS_MESSAGES = {
    saved: "Data has been successfully saved.",
    deleted: "Item has been successfully deleted.",
    updated: "Data has been successfully updated."
};
