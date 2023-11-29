<template>
    <MaeNavbar />
    <main class="mae-main">
        <slot></slot>
    </main>
    <ShipSelector />
    <EquipSelector />
    <SpweaponSelector />
</template>

<style lang="scss">
    .mae-main {
        padding-top: 2em;
    }

    .mae-navbar {
        z-index: 64;
    }
</style>