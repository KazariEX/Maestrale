import { Ship } from "~/utils/Ship";

export const useFleetStore = defineStore("fleet", () => {
    //主力舰队
    const main = ref([
        null,
        null,
        null
    ]);

    //先锋舰队
    const vanguard = ref([
        null,
        null,
        null
    ]);

    //当前选中的舰船
    const curShip: Ref<Ship> = ref();

    //属性加成显示模式
    const attrExtraMode = ref(false);

    return {
        main,
        vanguard,
        curShip,
        attrExtraMode
    };
});