<script setup>
    const fleetStore = useFleetStore();

    fleetStore.main = [
        null,
        new Ship(80501),
        null
    ];

    fleetStore.vanguard = [
        new Ship(60104),
        new Ship(60105),
        null
    ];

    fleetStore.curShip = fleetStore.vanguard[0];
</script>

<template>
    <div class="mae-index">
        <div class="ship-fleet">
            <ShipItem
                v-for="(ship, i) in fleetStore.main"
                fleet="main"
                :order="i"
                :ship="ship"
            />
        </div>
        <div class="ship-fleet">
            <ShipItem
                v-for="(ship, i) in fleetStore.vanguard"
                fleet="vanguard"
                :order="i"
                :ship="ship"
            />
        </div>
        <ShipStatus />
    </div>
</template>

<style lang="scss" scoped>
    .mae-index {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 560px;
        margin: 2em auto;
    }

    .ship-fleet {
        display: grid;
        gap: 8px;
    }
</style>