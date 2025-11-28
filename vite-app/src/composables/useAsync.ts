import { ref } from 'vue';

export function useAsync<T extends (...args: any[]) => Promise<any>>(asyncFn: T) {
    const loading = ref(false);

    const execute = async (...args: Parameters<T>) => {
        loading.value = true;
        try {
            return await asyncFn(...args);
        } finally {
            loading.value = false;
        }
    };

    return { loading, execute };
}