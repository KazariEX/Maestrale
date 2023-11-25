<script setup>
    import armorMap from "~/data/constraint/armor";

    const fleetStore = useFleetStore();
    const ship = storeToRefs(fleetStore).curShip;
</script>

<template>
    <div class="ship-status">
        <div class="attr-table">
            <div>
                <i><nuxt-img src="/image/prefab/variantplatform/durability.png"/></i>
                <span class="title">耐久</span>
                <span class="content">{{ Math.floor(ship?.durability) }}</span>
            </div>
            <div>
                <i><nuxt-img src="/image/prefab/variantplatform/armor.png"/></i>
                <span class="title">{{ armorMap[ship?.armor] }}</span>
            </div>
            <div>
                <i><nuxt-img src="/image/prefab/variantplatform/reload.png"/></i>
                <span class="title">装填</span>
                <span class="content">{{ Math.floor(ship?.reload) }}</span>
            </div>
            <div>
                <i><nuxt-img src="/image/prefab/variantplatform/cannon.png"/></i>
                <span class="title">炮击</span>
                <span class="content">{{ Math.floor(ship?.cannon) }}</span>
            </div>
            <div>
               <i><nuxt-img src="/image/prefab/variantplatform/torpedo.png"/></i>
                <span class="title">雷击</span>
                <span class="content">{{ Math.floor(ship?.torpedo) }}</span>
            </div>
            <div>
               <i><nuxt-img src="/image/prefab/variantplatform/dodge.png"/></i>
                <span class="title">机动</span>
                <span class="content">{{ Math.floor(ship?.dodge) }}</span>
            </div>
            <div>
               <i><nuxt-img src="/image/prefab/variantplatform/antiaircraft.png"/></i>
                <span class="title">防空</span>
                <span class="content">{{ Math.floor(ship?.antiaircraft) }}</span>
            </div>
            <div>
               <i><nuxt-img src="/image/prefab/variantplatform/air.png"/></i>
                <span class="title">航空</span>
                <span class="content">{{ Math.floor(ship?.air) }}</span>
            </div>
            <div>
               <i><nuxt-img src="/image/prefab/variantplatform/hit.png"/></i>
                <span class="title">命中</span>
                <span class="content">{{ Math.floor(ship?.hit) }}</span>
            </div>
            <template v-if="[8, 17, 22].includes(ship?.type)">
                <div>
                    <i><nuxt-img src="/image/prefab/variantplatform/oxy_max.png"/></i>
                    <span class="title">氧气</span>
                    <span class="content">{{ Math.floor(ship?.oxy_max) }}</span>
                </div>
                <div>
                    <i><nuxt-img src="/image/prefab/variantplatform/ammo.png"/></i>
                    <span class="title">弹药量</span>
                    <span class="content">{{ Math.floor(ship?.ammo) }}</span>
                </div>

            </template>
            <template v-else>
                <div>
                    <i><nuxt-img src="/image/prefab/variantplatform/antisub.png"/></i>
                    <span class="title">反潜</span>
                    <span class="content">{{ Math.floor(ship?.antisub) }}</span>
                </div>
            </template>
            <div>
                <i><nuxt-img src="/image/prefab/variantplatform/attr_speed.png"/></i>
                <span class="title">航速</span>
                <span class="content">{{ Math.floor(ship?.speed) }}</span>
            </div>
            <div class="attr-last">
               <i><nuxt-img src="/image/prefab/variantplatform/luck.png"/></i>
                <span class="title">幸运</span>
                <span class="content">{{ ship?.luck }}</span>
            </div>
            <div class="attr-last">
               <i><nuxt-img src="/image/prefab/variantplatform/expend.png"/></i>
                <span class="title">消耗</span>
                <span class="content">{{ ship?.oil }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .attr-table {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        font-size: 14px;

        > div {
            display: flex;
            gap: 4px;
            background-color: rgb(0 0 0 / 10%);
            line-height: 28px;
        }

        i {
            display: flex;
            padding-inline: 2px;
            background-color: rgb(0 0 0 / 25%);

            > img {
                width: 24px;
                max-height: 28px;
                margin-block: auto;
            }
        }

        .content {
            flex: 1;
            padding-right: 4px;
            text-align: right;
        }
    }

    .attr-last {
        grid-row-start: 5;
    }
</style>