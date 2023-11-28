import { cloneDeep } from "lodash";
import technologyTable from "~/data/constraint/technology";

export const useTechnologyStore = defineStore("technology", {
    state: () => cloneDeep(technologyTable),
    actions: {
        get(type: number, attr: string) {
            const t = getTechnolagyType(type);
            return this[t][attr];
        }
    },
    persist: true
});

function getTechnolagyType(type: number) {
    switch (type) {
        case 20:
        case 21:
            return 1;
        case 23:
        case 24:
            return 22;
        default:
            return type;
    }
}