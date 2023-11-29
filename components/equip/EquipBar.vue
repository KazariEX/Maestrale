<script setup>
    const props = defineProps({
        ship: Ship
    });
</script>

<template>
    <div class="equip-bar">
        <EquipItem v-for="i in 5" :ship="ship" :slot="i - 1"/>
        <SpweaponItem :ship="ship"/>
    </div>
</template>

<style lang="scss" scoped>
    .equip-bar {
        display: flex;
    }
</style>