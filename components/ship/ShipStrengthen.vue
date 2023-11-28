<script setup>
    const fleetStore = useFleetStore();
    const ship = storeToRefs(fleetStore).curShip;

    const data = computed(() => {
        switch (ship.value?.strengthenType) {
            case StrengthenType.normal: {
                return [
                    {
                        label: "炮击",
                        model: [ship.value.strengthen, "cannon"],
                        max: ship.value.strengthenMax[0]
                    },
                    {
                        label: "雷击",
                        model: [ship.value.strengthen, "torpedo"],
                        max: ship.value.strengthenMax[1]
                    },
                    {
                        label: "航空",
                        model: [ship.value.strengthen, "air"],
                        max: ship.value.strengthenMax[3]
                    },
                    {
                        label: "装填",
                        model: [ship.value.strengthen, "reload"],
                        max: ship.value.strengthenMax[4]
                    }
                ];
            }
            case StrengthenType.blueprint: {
                return [
                    {
                        label: "蓝图",
                        model: [ship.value, "blueprint1"],
                        max: ship.value.blueprintMax1
                    },
                    {
                        label: "天运",
                        model: [ship.value, "blueprint2"],
                        max: ship.value.blueprintMax2
                    }
                ];
            }
            default: return [];
        }
    });
</script>

<template>
    <el-form class="ship-strengthen">
        <el-form-item v-for="item in data" class="strengthen-slider" :label="item.label">
            <el-slider
                v-model="item.model[0][item.model[1]]"
                :max="item.max || 1"
                :disabled="item.max === 0"
                :show-tooltip="false"
                show-input
            />
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
    .strengthen-slider {
        gap: 8px;
        margin-bottom: 0;

        & + & {
            margin-top: 1em;
        }
    }
</style>