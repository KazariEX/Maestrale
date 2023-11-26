import type { WritableComputedRef } from "vue";
import ship_data_blueprint from "~/data/ShareCfg(VVVIP)/ship_data_blueprint.json";
import ship_data_statistics from "~/data/ShareCfg(VVVIP)/ship_data_statistics.json";
import ship_data_strengthen from "~/data/ShareCfg(VVVIP)/ship_data_strengthen.json";
import ship_data_template from "~/data/ShareCfg(VVVIP)/ship_data_template.json";
import ship_skin_template from "~/data/ShareCfg(VVVIP)/ship_skin_template.json";
import ship_strengthen_blueprint from "~/data/ShareCfg(VVVIP)/ship_strengthen_blueprint.json";

type Attributes = Partial<{
    durability: number,
    cannon: number,
    torpedo: number,
    antiaircraft: number,
    air: number,
    reload: number,
    hit: number,
    dodge: number,
    speed: number,
    luck: number,
    antisub: number
}>;

export enum StrengthenType {
    normal,
    blueprint,
    meta
};

export class Ship {
    level: Ref<number>;
    favor: Ref<number>;
    limitBreak: Ref<number> | WritableComputedRef<number>;

    strengthen: Ref<Attributes>;
    strengthenType: StrengthenType;

    blueprint?: Ref<number>;
    blueprint1?: WritableComputedRef<number>;
    blueprint2?: WritableComputedRef<number>;
    blueprintMax1?: number;
    blueprintMax2?: number;
    blueprintLevel?: WritableComputedRef<number>;

    private data_strengthen: any;
    private data_statistics: any;
    private data_template: any;
    private skin_template: any;

    constructor(
        private id: number
    ) {
        this.data_statistics = [
            (ship_data_statistics as any)[id + "1"],
            (ship_data_statistics as any)[id + "2"],
            (ship_data_statistics as any)[id + "3"],
            (ship_data_statistics as any)[id + "4"]
        ];
        this.data_template = [
            (ship_data_template as any)[id + "1"],
            (ship_data_template as any)[id + "2"],
            (ship_data_template as any)[id + "3"],
            (ship_data_template as any)[id + "4"]
        ];
        this.skin_template = (ship_skin_template as any)[id + "0"];

        //等级
        this.level = ref(125);

        //好感
        this.favor = ref(3);

        if (id in ship_data_blueprint) {
            //科研
            this.strengthenType = StrengthenType.blueprint;

            //读取数据
            const data_blueprint = (ship_data_blueprint as any)[id];
            this.data_strengthen = [
                ...data_blueprint.strengthen_effect,
                ...data_blueprint.fate_strengthen
            ].map((i: number) => {
                return (ship_strengthen_blueprint as any)[i];
            });

            //最大蓝图数量（常规）
            this.blueprintMax1 = this.data_strengthen.slice(0, 30).reduce((res, item) => {
                return res + item.need_exp;
            }, 0) / 10;

            //最大蓝图数量（天运）
            this.blueprintMax2 = this.data_strengthen.slice(30).reduce((res, item) => {
                return res + item.need_exp;
            }, 0) / 10;

            //蓝图数量
            this.blueprint = ref(this.blueprintMax1 + this.blueprintMax2);

            //蓝图数量（常规）
            this.blueprint1 = computed({
                get: () => {
                    return Math.min(this.blueprint.value, this.blueprintMax1);
                },
                set: (value) => {
                    this.blueprint.value = value;
                }
            });

            //蓝图数量（天运）
            this.blueprint2 = computed({
                get: () => {
                    return Math.max(0, this.blueprint.value - this.blueprintMax1);
                },
                set: (value) => {
                    this.blueprint.value = value + this.blueprintMax1;
                }
            });

            //蓝图等级
            this.blueprintLevel = computed({
                get: () => {
                    let level = 0;
                    let exp = 0;
                    for (const item of this.data_strengthen) {
                        exp += item.need_exp;
                        if (this.blueprint.value >= exp / 10) {
                            level++;
                        }
                        else break;
                    }
                    return level;
                },
                set: (level) => {
                    let exp = 0;
                    for (let i = 0; i < level; i++) {
                        exp += this.data_strengthen[i].need_exp;
                    }
                    this.blueprint.value = exp / 10;
                }
            });

            //强化
            this.strengthen = computed(() => {
                const res = createAttributes();

                for (let i = 0; i < this.blueprintLevel.value; i++) {
                    const item = this.data_strengthen[i];

                    for (const attr of item.effect_attr) {
                        res[attr[0]] += attr[1];
                    }

                    res.cannon += item.effect[0] / 100;
                    res.torpedo += item.effect[1] / 100;
                    res.air += item.effect[3] / 100;
                    res.reload += item.effect[4] / 100;
                }
                return res;
            });

            //突破
            this.limitBreak = computed({
                get: () => {
                    const lv = this.blueprintLevel.value;

                    if (lv < 10) return 0;
                    else if (lv < 20) return 1;
                    else if (lv < 30) return 2;
                    else return 3;
                },
                set: (value) => {
                    this.blueprintLevel.value = {
                        0: 0,
                        1: 10,
                        2: 20,
                        3: 30
                    }[value] ?? 0;
                }
            });
        }
        else {
            //常规
            this.strengthenType = StrengthenType.normal;

            //读取数据
            this.data_strengthen = (ship_data_strengthen as any)[id];

            //强化
            this.strengthen = ref(createAttributes({
                cannon: this.strengthenMax[0],
                torpedo: this.strengthenMax[1],
                air: this.strengthenMax[3],
                reload: this.strengthenMax[4]
            }));

            //突破
            this.limitBreak = ref(3);
        }
    }

    //素材
    get painting() {
        return this.skin_template.painting;
    }

    //满强化值
    get strengthenMax(): number[] {
        return this.data_strengthen.durability;
    }

    private get statistics() {
        return this.data_statistics[this.limitBreak.value];
    }

    private get template() {
        return this.data_template[this.limitBreak.value];
    }

    //名称
    name = computed(() => {
        return this.statistics.name;
    });

    //装甲类型
    armor = computed(() => {
        return this.statistics.armor_type;
    });

    //阵营
    nationality = computed(() => {
        return this.statistics.nationality;
    });

    //稀有度
    rarity = computed(() => {
        return this.statistics.rarity;
    });

    //舰种
    type = computed(() => {
        return this.statistics.type;
    });

    //获取属性白值
    private getAttr(index: number, attrName: keyof Attributes) {
        const favorRate = ["speed", "luck"].includes(attrName) ? 1 : getFavorRate(this.favor.value);

        return (
            this.statistics.attrs[index] +
            this.statistics.attrs_growth[index] * (this.level.value - 1) / 1000 +
            this.strengthen.value[attrName]
        ) * favorRate;
    }

    //耐久
    durability = computed(() => {
        return this.getAttr(0, "durability");
    });

    //炮击
    cannon = computed(() => {
        return this.getAttr(1, "cannon");
    });

    //雷击
    torpedo = computed(() => {
        return this.getAttr(2, "torpedo");
    });

    //防空
    antiaircraft = computed(() => {
        return this.getAttr(3, "antiaircraft");
    });

    //航空
    air = computed(() => {
        return this.getAttr(4, "air");
    });

    //装填
    reload = computed(() => {
        return this.getAttr(5, "reload");
    });

    //命中
    hit = computed(() => {
        return this.getAttr(7, "hit");
    });

    //机动
    dodge = computed(() => {
        return this.getAttr(8, "dodge");
    });

    //航速
    speed = computed(() => {
        return this.getAttr(9, "speed");
    });

    //幸运
    luck = computed(() => {
        return this.getAttr(10, "luck");
    });

    //反潜
    antisub = computed(() => {
        return this.getAttr(11, "antisub");
    });

    //氧气
    oxy_max = computed(() => {
        return this.statistics.oxy_max;
    });

    //弹药量
    ammo = computed(() => {
        return this.statistics.ammo;
    });

    //油耗
    oil = computed(() => {
        const levelRate = 0.5 + 0.005 * Math.min(99, this.level.value);

        return Math.floor((([8, 17, 22].includes(this.type.value) ? 0 : 1) + this.template.oil_at_end * levelRate));
    });
}

function createAttributes(options: Attributes = {}) {
    return {
        durability: 0,
        cannon: 0,
        torpedo: 0,
        antiaircraft: 0,
        air: 0,
        reload: 0,
        hit: 0,
        dodge: 0,
        speed: 0,
        luck: 0,
        antisub: 0,
        ...options
    };
}

function getFavorRate(favor: number) {
    switch (favor) {
        case 1: return 1.01;
        case 2: return 1.03;
        case 3: return 1.06;
        case 4: return 1.09;
        case 5: return 1.12;
        default: return 1;
    }
}