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
        <div class="ship-fleet-wrapper">
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
        </div>
        <div class="ship-details">
            <ShipStatus />
            <ShipStrengthen />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .mae-index {
        display: flex;
        justify-content: center;
        gap: 2em;
        margin: 2em auto;
    }

    .ship-fleet-wrapper {
        display: grid;
        gap: 2em;
    }

    .ship-fleet {
        display: grid;
        gap: 0.5em;
        width: 560px;
    }

    .ship-details {
        display: flex;
        flex-direction: column;
        gap: 2em;
        width: 480px;
    }
</style>