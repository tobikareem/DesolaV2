/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicClientApplication, LogLevel } from "@azure/msal-browser";
import { AZURE_B2C } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

const customStorageInstance = new CustomStorage();

const customCachePlugin = {
    beforeCacheAccess: async (cacheContext: any) => {
        cacheContext.tokenCache.deserialize(customStorageInstance.getItem("msal-cache") ?? "");
    },
    afterCacheAccess: async (cacheContext: any) => {
        customStorageInstance.setItem("msal-cache", cacheContext.tokenCache.serialize());
    }
};

const msalConfig = {
    auth: {
        clientId: AZURE_B2C.CLIENT_ID, 
        authority: `${AZURE_B2C.AUTHORITY}`, 
        knownAuthorities: [`${AZURE_B2C.TENANT}.b2clogin.com`], 
        redirectUri: AZURE_B2C.REDIRECT_URI,
        postLogoutRedirectUri: "/"
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false
    },
    system: {
        cachePlugin: customCachePlugin,  
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) return;
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    case LogLevel.Info:
                        console.info(message);
                        break;
                    case LogLevel.Verbose:
                        console.debug(message);
                        break;
                }
            },
            logLevel: LogLevel.Info,  
        }
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);
