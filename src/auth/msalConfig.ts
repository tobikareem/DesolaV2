import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { TokenCacheContext } from "@azure/msal-common";
import { AZURE_B2C, SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

const customStorage = new CustomStorage();

const msalConfig = {
    auth: {
        clientId: AZURE_B2C.CLIENT_ID,
        authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.SIGNUP_SIGNIN_POLICY}/v2.0/`,
        knownAuthorities: [`${AZURE_B2C.TENANT}.b2clogin.com`],
        redirectUri: AZURE_B2C.REDIRECT_URI,
        postLogoutRedirectUri: "/"
    },
    system: {
        cachePlugin: {
            beforeCacheAccess: (context: TokenCacheContext) => {
                console.log("beforeCacheAccess called");

                try {
                    const cachedData = customStorage.getItem(SESSION_VALUES.azure_msal_token_keys) ?? "";
                    context.tokenCache.deserialize(cachedData);
                } catch (error) {
                    console.error("Failed to read from custom storage:", error);
                }
            },
            afterCacheAccess: (context: TokenCacheContext) => {
                console.log("afterCacheAccess called, cacheHasChanged:", context.cacheHasChanged);

                try {
                    if (context.cacheHasChanged) {
                        const serializedCache = context.tokenCache.serialize();
                        customStorage.setItem("msal.token.keys.74fcd046-95a8-43a7-947d-1efcdb553a07", serializedCache);
                    }
                } catch (error) {
                    console.error("Failed to write to custom storage:", error);
                }
            }
        },
        loggerOptions: { logLevel: LogLevel.Info }
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);