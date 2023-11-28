<script setup>
    const props = defineProps({
        title: {
            type: String
        },
        attrName: {
            type: String
        },
        icon: {
            type: String
        }
    });

    const fleetStore = useFleetStore();
    const ship = storeToRefs(fleetStore).curShip;

    //基础白值
    const baseValue = computed(() => {
        return ship.value?.[props.attrName];
    });

    //装备属性值
    const equipValue = computed(() => {
        return ship.value?.equipAttrs?.[props.attrName];
    });
</script>

<template>
    <div class="ship-status-item">
        <i><nuxt-img :src="`/image/prefab/variantplatform/${icon ?? attrName}.png`"/></i>
        <span>{{ title }}</span>
        <div class="status-content">
            <span v-if="baseValue !== void(0)">{{ Math.floor(baseValue) || 0 }}</span>
            <span v-if="equipValue > 0" class="equip">+{{ equipValue }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ship-status-item {
        $h: 28px;

        display: flex;
        gap: 4px;
        height: $h;
        background-color: rgb(0 0 0 / 10%);
        line-height: $h;

        i {
            display: flex;
            padding-inline: 2px;
            background-color: rgb(0 0 0 / 25%);

            > img {
                width: 24px;
                max-height: $h;
                margin-block: auto;
            }
        }
    }

    .status-content {
        flex: 1;
        padding-right: 4px;
        text-align: right;

        .equip {
            color: var(--el-color-success-dark-2);
        }
    }
</style>