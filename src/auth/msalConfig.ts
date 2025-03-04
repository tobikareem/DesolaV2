import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { TokenCacheContext } from "@azure/msal-common";
import { AZURE_B2C } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

const customStorageInstance = new CustomStorage();

const customCachePlugin = {
    beforeCacheAccess: async (cacheContext: TokenCacheContext) => {
        cacheContext.tokenCache.deserialize(customStorageInstance.getItem("msal-cache") ?? "");
    },
    afterCacheAccess: async (cacheContext: TokenCacheContext) => {
        if (cacheContext.cacheHasChanged) {
            customStorageInstance.setItem("msal-cache", cacheContext.tokenCache.serialize());
        }
    }
};

const msalConfig = {
    auth: {
        clientId: AZURE_B2C.CLIENT_ID,
        authority: AZURE_B2C.AUTHORITY,
        knownAuthorities: [`${AZURE_B2C.TENANT}.b2clogin.com`],
        redirectUri: AZURE_B2C.REDIRECT_URI,
        postLogoutRedirectUri: "/"
    },
    system: {
        cachePlugin: customCachePlugin,
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) return;
                // switch (level) {
                //     case LogLevel.Error:
                //         console.error(message);
                //         break;
                //     case LogLevel.Warning:
                //         console.warn(message);
                //         break;
                //     case LogLevel.Info:
                //         console.info(message);
                //         break;
                //     case LogLevel.Verbose:
                //         console.debug(message);
                //         break;
                // }
            },
            logLevel: LogLevel.Info,
        }
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);

// class MyCachePlugin implements ICachePlugin {
//     private client: ICacheClient;

//     constructor(client: ICacheClient) {
//         this.client = client; // client object to access the persistent cache
//     }

//     public async beforeCacheAccess(
//         cacheContext: TokenCacheContext
//     ): Promise<void> {
//         const cacheData = await this.client.get(); // get the cache from persistence
//         cacheContext.tokenCache.deserialize(cacheData); // deserialize it to in-memory cache
//     }

//     public async afterCacheAccess(
//         cacheContext: TokenCacheContext
//     ): Promise<void> {
//         if (cacheContext.cacheHasChanged) {
//             await this.client.set(cacheContext.tokenCache.serialize()); // deserialize in-memory cache to persistence
//         }
//     }
// }