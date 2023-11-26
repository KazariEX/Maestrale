<script setup>
    import { nationalityOptions } from "~/data/constraint/nationality";
    import { rarityOptions } from "~/data/constraint/rarity";
    import { typeOptions } from "~/data/constraint/type";
    import ship_data_statistics from "~/data/ShareCfg(VVVIP)/ship_data_statistics.json";
    import ship_skin_template from "~/data/ShareCfg(VVVIP)/ship_skin_template.json";

    const shipSelectorStore = useShipSelectorStore();

    const ids = new Set(
        Object.keys(ship_data_statistics)
        .map((id) => id.slice(0, id.length - 1))
        .filter((id) => !id.startsWith("900"))
    );

    const statis = {};
    for (const id of ids) {
        const obj = ship_data_statistics[id + "1"];
        if (obj !== void(0)) {
            statis[id] = obj;
        }
    }

    const filter = ref({
        rarity: 0,
        type: 0,
        nationality: 0
    });

    //关闭抽屉时
    function onClose() {
        shipSelectorStore.resolve(-1);
    }

    //选择舰娘，返回ID
    function selectShip(id) {
        shipSelectorStore.resolve(id);
        shipSelectorStore.close();
    }
</script>

<template>
    <el-drawer
        v-model="shipSelectorStore.openState"
        title="选择舰船"
        size="520px"
        @close="onClose"
        ><div class="ship-selector">
            <el-form class="selector-filter" label-position="top">
                <el-form-item label="稀有度">
                    <el-select v-model="filter.rarity">
                        <el-option
                            v-for="item in [{ value: 0, label: `全部` }, ...rarityOptions]"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="舰种">
                    <el-select v-model="filter.type">
                        <el-option
                            v-for="item in [{ value: 0, label: `全部` }, ...typeOptions]"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="阵营">
                    <el-select v-model="filter.nationality">
                        <el-option
                            v-for="item in [{ value: 0, label: `全部` }, ...nationalityOptions]"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="selector-list">
                <template v-for="(item, id) in statis" :key="id">
                    <div v-show="
                        shipSelectorStore.curTypes.includes(item.type) &&
                        (filter.rarity === 0 || item.rarity === filter.rarity) &&
                        (filter.type === 0 || item.type === filter.type) &&
                        (filter.nationality === 0 || item.nationality === filter.nationality)
                    " class="selector-item">
                        <nuxt-img
                            class="icon"
                            loading="lazy"
                            :style="{ backgroundImage: `url(/image/artresource/atlas/weaponframes/bg${item.rarity - 1}.png)` }"
                            :src="`/image/artresource/atlas/squareicon/${
                                ship_skin_template[id + `0`].painting
                            }.png`"
                            :title="item.name"
                            @click="selectShip(id)"
                        />
                        <span class="name">{{ item.name }}</span>
                    </div>
                </template>
            </div>
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
    .ship-selector {
        display: grid;
        grid-template-rows: auto 1fr;
        max-height: calc(100% + 40px);
        margin: -20px;
        padding-left: 20px;
    }

    .selector-filter, .selector-list {
        gap: 16px;
        overflow: auto;
        padding-right: 20px;
        scrollbar-gutter: stable;
    }

    .selector-filter {
        display: flex;
    }

    .selector-list {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        gap: 16px;
        padding-bottom: 20px;
        font-size: 14px;
    }

    .selector-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 64px;
        cursor: pointer;

        .icon {
            aspect-ratio: 1;
        }

        .name {
            overflow: hidden;
            font-size: 12px;
            text-align: center;
            text-overflow: ellipsis;
            text-wrap: nowrap;
        }
    }
</style>