<script setup>
    const props = defineProps({
        ship: {
            type: Ship,
            require: true
        },
        slot: {
            type: Number,
            require: true
        }
    });

    const equip = computed(() => {
        return props.ship?.equips?.[props.slot];
    });

    const equipSelectorStore = useEquipSelectorStore();
    const { backgroundStyle, frameStyle } = useRarityStyle(() => equip.value?.rarity);


    //打开舰娘选择器
    async function openSelector() {
        const id = await equipSelectorStore.open(props.ship, props.slot);

        if (id !== -1) {
            props.ship.equips[props.slot] = createEquip(id);
        }
    }
</script>

<template>
    <div class="equip-item">
        <div
            class="equip-wrapper"
            :style="backgroundStyle"
            @click="openSelector"
            ><nuxt-img v-if="equip" class="equip-icon" :src="`/image/artresource/atlas/equips/${equip.icon}.png`"/>
            <div class="equip-frame" :style="frameStyle"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .equip-item {
        position: relative;
        width: 64px;
        height: 64px;
        background-image: url("/image/artresource/ui/shipinfoui/sucai_butten 1.png");

        & + & {
            margin-left: -1px;
        }
    }

    .equip-wrapper {
        display: flex;
        position: absolute;
        inset: 2px 6px 6px 2px;
        cursor: pointer;
    }

    .equip-icon {
        max-width: 48px;
        max-height: 48px;
        margin: auto;
    }

    .equip-frame {
        position: absolute;
        inset: 0;
    }
</style>