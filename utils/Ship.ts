import ship_data_statistics from "~/data/ShareCfg(VVVIP)/ship_data_statistics.json";
import ship_data_strengthen from "~/data/ShareCfg(VVVIP)/ship_data_strengthen.json";
import ship_data_template from "~/data/ShareCfg(VVVIP)/ship_data_template.json";
import ship_skin_template from "~/data/ShareCfg(VVVIP)/ship_skin_template.json";

interface Attributes {
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
}

type Strengthen = Pick<Attributes, "cannon" | "torpedo" | "reload" | "air">;

export class Ship {
    level: Ref<number>;
    favor: Ref<number>;
    limitBreak: Ref<number>;
    strengthen: Ref<Strengthen>;

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
        this.data_strengthen = (ship_data_strengthen as any)[id];
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

        //突破
        this.limitBreak = ref(3);

        //强化
        this.strengthen = ref({
            cannon: this.maxStrengthen[0],
            torpedo: this.maxStrengthen[1],
            air: this.maxStrengthen[3],
            reload: this.maxStrengthen[4]
        });
    }

    //素材
    get painting() {
        return this.skin_template.painting;
    }

    //满强化值
    get maxStrengthen() {
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
            (this.strengthen.value[attrName as keyof Strengthen] ?? 0)
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

        return Math.floor((
            [8, 17, 22].includes(this.type.value) ?
            (0 + this.template.oil_at_end * levelRate) :
            (1 + this.template.oil_at_end * levelRate)
        ));
    });
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