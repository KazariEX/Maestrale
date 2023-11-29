import { Ship } from "./Ship";

export class PowerCalculator {
    constructor(
        private ship: Ship
    ) {}

    //合计属性战力
    private attrsPower = computed(() => {
        const attrs = createAttributes();
        const technologyStore = useTechnologyStore();

        for (const attr in attrs) {
            attrs[attr] =
                Math.floor(this.ship[attr].value) +
                this.ship.equipAttrs.value[attr] +
                technologyStore.get(this.ship.type.value, attr);
        }

        return (
            attrs.durability * 0.2 +
            attrs.cannon +
            attrs.torpedo +
            attrs.antiaircraft +
            attrs.air +
            attrs.reload +
            attrs.hit * 2 +
            attrs.dodge * 2 +
            attrs.speed +
            attrs.antisub
        );
    });

    //装备品质战力
    private equipPower = computed(() => {
        return this.ship.equips.value.reduce((res, equip) => {
            if (equip) {
                const [base, strengthen] = getEquipPower(equip.rarity);
                res += base + strengthen * (1 + (equip.level as any));
            }
            return res;
        }, 0);
    });

    //改造技能战力
    private transPower = computed(() => {
        let res = 0;
        if (this.ship.canTransform) {
            for (let i = 0; i < 6; i++) {
                const list = this.ship.transformTable[i];

                for (const key of list) {
                    if (key) {
                        const temp = this.ship.transformTemplate[key];
                        if (temp.enable.value) {
                            res += getTransPower(i);
                        }
                    }
                }
            }
        }
        return res;
    });

    //综合战力
    power = computed(() => {
        return (
            this.attrsPower.value +
            this.equipPower.value +
            this.transPower.value
        );
    });
}

function getEquipPower(rarity: number) {
    switch (rarity) {
        case 1: return [30, 5];
        case 2: return [50, 8];
        case 3: return [80, 10];
        case 4: return [120, 12];
        case 5: return [180, 15];
        case 6: return [300, 20];
    }
}

function getTransPower(index: number) {
    switch (index) {
        case 0: return 10;
        case 1: return 15;
        case 2: return 20;
        case 3: return 25;
        case 4: return 30;
        case 5: return 50;
    }
}