<script setup>
    import fleetTable from "~/data/constraint/fleet";
    import { nationalityTable } from "~/data/constraint/nationality";
    import { typeTable } from "~/data/constraint/type";

    const props = defineProps({
        ship: {
            type: Ship,
            require: true
        },
        fleet: {
            type: String
        },
        order: {
            type: Number
        }
    });

    const limitBreakOptions = [
        {
            value: 0,
            label: "零破"
        },
        {
            value: 1,
            label: "一破"
        },
        {
            value: 2,
            label: "二破"
        },
        {
            value: 3,
            label: "满破"
        }
    ];

    const favorOptions = [
        {
            value: -1,
            label: "失望"
        },
        {
            value: 0,
            label: "陌生"
        },
        {
            value: 1,
            label: "友好"
        },
        {
            value: 2,
            label: "喜欢"
        },
        {
            value: 3,
            label: "爱"
        },
        {
            value: 4,
            label: "誓约"
        },
        {
            value: 5,
            label: "誓约+"
        }
    ];

    const fleetStore = useFleetStore();
    const shipSelectorStore = useShipSelectorStore();

    //打开舰娘选择器
    async function openSelector() {
        const id = await shipSelectorStore.open(fleetTable[props.fleet]);

        if (id !== -1) {
            fleetStore[props.fleet][props.order] = new Ship(id);
            switchCurShip();
        }
    }

    //切换当前选中舰娘
    function switchCurShip() {
        fleetStore.curShip = fleetStore[props.fleet][props.order];
    }
</script>

<template>
    <div class="ship-item" :class="{
        selected: ship && ship === fleetStore.curShip
    }" @click="switchCurShip">
        <div
            class="ship-icon-wrapper"
            :style="{ backgroundImage: `url(/image/artresource/atlas/weaponframes/bg${ship?.rarity - 1}.png)` }"
            @click="openSelector"
            ><nuxt-img class="ship-icon" :src="`/image/artresource/atlas/squareicon/${ship?.painting ?? `unknown`}.png`"/>
            <div class="ship-icon-frame" :style="{ backgroundImage: `url(/image/artresource/atlas/weaponframes/frame_${(ship?.rarity ?? 2) - 1}.png)` }"></div>
        </div>
        <template v-if="ship">
            <section class="ship-section">
                <p><el-text type="info">名称：</el-text><el-text>{{ ship.name }}</el-text></p>
                <el-input-number
                    v-model="ship.level"
                    :min="1"
                    :max="125"
                />
            </section>
            <section class="ship-section">
                <p><el-text type="info">舰种：</el-text><el-text>{{ typeTable[ship.type] }}</el-text></p>
                <el-select v-model="ship.limitBreak">
                    <el-option
                        v-for="item in limitBreakOptions"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </section>
            <section class="ship-section">
                <p><el-text type="info">阵营：</el-text><el-text>{{ nationalityTable[ship.nationality] ?? "其他" }}</el-text></p>
                <el-select v-model="ship.favor">
                    <el-option
                        v-for="item in favorOptions"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </section>
        </template>
        <span v-else class="ship-no-data">NO DATA</span>
    </div>
</template>

<style lang="scss" scoped>
    .ship-item {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 80px;
        padding: 8px;
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);
        background-color: var(--el-bg-color);

        &.selected {
            border-color: var(--el-color-primary);
            outline: 1px solid var(--el-color-primary);
        }
    }

    .ship-icon-wrapper {
        display: flex;
        position: relative;
        box-shadow: var(--el-box-shadow);
        background-size: cover;
        cursor: pointer;
    }

    .ship-icon {
        width: 64px;
        height: 64px;
    }

    .ship-icon-frame {
        position: absolute;
        inset: 0;
        background-size: cover;
    }

    .ship-section {
        > p {
            padding-bottom: 4px;
            line-height: 28px;
        }

        > div {
            display: flex;
        }
    }

    .ship-no-data {
        flex: 1;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: var(--el-color-info-light-5);
        user-select: none;
    }
</style>