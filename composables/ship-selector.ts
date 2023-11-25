export const useShipSelectorStore = defineStore("ship-selector", () => {
    const openState = ref(false);
    const curTypes = ref([0]);
    const resolve = ref();

    function open(types: number[]) {
        return new Promise((res, rej) => {
            openState.value = true;
            curTypes.value = types;
            resolve.value = res;
        });
    }

    function close() {
        openState.value = false;
    }

    return {
        openState,
        curTypes,
        open,
        close,
        resolve
    };
});