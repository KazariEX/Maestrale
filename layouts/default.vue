<template>
    <MaeNavbar />
    <main class="mae-main">
        <slot></slot>
    </main>
    <EquipSelector />
    <ShipSelector />
</template>

<style lang="scss">
    .mae-main {
        padding-top: 2em;
    }
</style>