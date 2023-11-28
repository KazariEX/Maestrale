<script setup>
    const fleetStore = useFleetStore();

    fleetStore.main = [
        null,
        createShip(80501),
        null
    ];

    fleetStore.vanguard = [
        createShip(60104, {
            equips: [
                85040,
                0,
                0,
                0,
                2640
            ]
        }),
        createShip(60105),
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
            <EquipBar :ship="fleetStore.curShip"/>
            <ShipStatus />
            <el-tabs type="border-card">
                <el-tab-pane label="强化">
                    <ShipStrengthen />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .mae-index {
        display: flex;
        justify-content: center;
        gap: 2em;
    }

    .ship-fleet-wrapper {
        display: grid;
        gap: 2em;
    }

    .ship-fleet {
        display: grid;
        gap: 0.5em;
    }

    .ship-details {
        display: flex;
        flex-direction: column;
        gap: 2em;
        width: 480px;
    }
</style>