<script setup>
    import attributeTable from "~/data/constraint/attribute";
    import technologyTable from "~/data/constraint/technology";

    const radioList = {
        1: "驱逐",
        2: "轻巡",
        3: "重巡",
        4: "战巡",
        5: "战列",
        6: "轻航",
        7: "正航",
        8: "潜艇",
        10: "航战",
        12: "维修",
        13: "重炮",
        17: "潜母",
        18: "超巡",
        19: "运输",
        22: "风帆"
    }

    const technolagyStore = useTechnologyStore();
    const type = ref(1);
</script>

<template>
    <div class="mae-technolagy">
        <el-radio-group v-model="type">
            <el-radio-button
                v-for="(name, label) in radioList"
                :label="label"
            >{{ name }}</el-radio-button>
        </el-radio-group>
        <el-form>
            <el-form-item v-for="(value, attr) in technologyTable[type]" :label="attributeTable[attr]">
                <el-input-number
                    v-model="technolagyStore.attrs[type][attr]"
                    :max="value"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
    .mae-technolagy {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
    }
</style>