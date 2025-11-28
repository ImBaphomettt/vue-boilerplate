import {ref} from "vue";

const visible = ref(false);

export const useVisibility = () => {
    const setVisible = (value: boolean) => {
        visible.value = value;
    };

    return {
        visible,
        setVisible,
    };
};