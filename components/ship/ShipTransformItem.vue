<script setup>
    const props = defineProps({
        id: Number,
        template: Object
    });

    function onClick() {
        props.template.enable = !props.template.enable;
    }
</script>

<template>
    <a class="ship-transform-item" :class="{ disabled: !template.enable }" @click="onClick">
        <nuxt-img class="transform-icon" :sizes="[28, 28]" :src="`/image/artresource/atlas/modicon/${template.icon}.png`"/>
        <span>{{ template.name }}</span>
    </a>
</template>

<style lang="scss" scoped>
    .ship-transform-item {
        display: grid;
        justify-items: center;
        height: 56px;
        padding-top: 4px;
        border: 1px solid var(--el-border-color);
        font-size: 12px;

        &.disabled {
            color: var(--el-text-color-disabled);

            .transform-icon {
                opacity: 0.5;
            }
        }
    }
</style>