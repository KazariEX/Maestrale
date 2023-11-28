<script setup>
    import armorTable from "~/data/constraint/armor";

    const fleetStore = useFleetStore();
    const ship = storeToRefs(fleetStore).curShip;
</script>

<template>
    <div class="ship-status">
        <div class="attr-table">
            <ShipStatusItem title="耐久" attr-name="durability"/>
            <ShipStatusItem :title="armorTable[ship?.armor]" icon="armor"/>
            <ShipStatusItem title="装填" attr-name="reload"/>
            <ShipStatusItem title="炮击" attr-name="cannon"/>
            <ShipStatusItem title="雷击" attr-name="torpedo"/>
            <ShipStatusItem title="机动" attr-name="dodge"/>
            <ShipStatusItem title="防空" attr-name="antiaircraft"/>
            <ShipStatusItem title="航空" attr-name="air"/>
            <ShipStatusItem title="命中" attr-name="hit"/>
            <template v-if="[8, 17, 22].includes(ship?.type)">
                <ShipStatusItem title="氧气" attr-name="oxy_max"/>
                <ShipStatusItem title="弹药量" attr-name="ammo"/>
            </template>
            <template v-else>
                <ShipStatusItem title="反潜" attr-name="antisub"/>
            </template>
            <ShipStatusItem title="航速" attr-name="speed" icon="attr_speed"/>
            <ShipStatusItem class="attr-last" title="幸运" attr-name="luck"/>
            <ShipStatusItem class="attr-last" title="消耗" attr-name="oil" icon="expend"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .attr-table {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        font-size: 14px;
    }

    .attr-last {
        grid-row-start: 5;
    }
</style>