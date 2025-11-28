import {onMounted, onUnmounted} from "vue";

interface NuiMessageData<T = unknown> {
    action: string;
    data: T;
}

/**
 * @Credit https://github.com/project-error/fivem-react-boilerplate-lua/blob/master/web/src/hooks/useNuiEvent.ts
 *
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/
export function useNuiEvent<T = unknown>(action: string, handler: (data: T) => void) {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
        const {action: eventAction, data} = event.data;
        if (eventAction === action) {
            handler(data);
        }
    };
    onMounted(() => {
        window.addEventListener("message", eventListener);
    });
    onUnmounted(() => {
        window.removeEventListener("message", eventListener);
    });
}