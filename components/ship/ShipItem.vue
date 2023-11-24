<script setup>
    const ship = ref(new Ship());
</script>

<template>
    <div class="ship-item">
        <el-input-number
            v-model="ship.level"
            :min="1"
            :max="125"
        />
    </div>
</template>

<style lang="scss" scoped>
    .ship-item {
        border: 1px solid var(--el-border-color);
    }
</style>