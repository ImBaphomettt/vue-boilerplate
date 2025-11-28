import {isEnvBrowser} from "../helpers/misc";

/**
 * @Credit : https://github.com/project-error/fivem-react-boilerplate-lua/blob/master/web/src/utils/fetchNui.ts
 *
 * Simple wrapper around fetch API tailored for CEF/NUI use. This abstraction
 * can be extended to include AbortController if needed or if the response isn't
 * JSON. Tailor it to your needs.
 *
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 * @param mockData - Mock data to be returned if in the browser
 * @param bFakeMockDataLoadWait - Mock data fake loading delay.
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
export async function fetchNui<T = any>(eventName: string, data?: any, mockData?: T, bFakeMockDataLoadWait?: number): Promise<T> {
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };
    if (isEnvBrowser() && mockData) {
        if (bFakeMockDataLoadWait !== undefined)
            await new Promise((resolve) => setTimeout(resolve, bFakeMockDataLoadWait));

        return mockData;
    }
    const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : "vue-vite-cfx-app";
    try {
        const resp = await fetch(`https://${resourceName}/${eventName}`, options);
        const respFormatted = await resp.json();
        return respFormatted;
    } catch (error) {
        console.error(`Erreur fetchNui vers ${eventName}:`, error);
        throw error;
    }
}