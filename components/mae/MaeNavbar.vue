<script setup>

</script>

<template>
    <div class="mae-navbar">
        <nuxt-link class="nav-item" to="/">编队</nuxt-link>
        <nuxt-link class="nav-item" to="/technolagy">舰队科技</nuxt-link>
    </div>
</template>

<style lang="scss" scoped>
    .mae-navbar {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 64px;
        box-shadow: var(--el-box-shadow);
        background-color: var(--el-bg-color);
    }

    .nav-item {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
</style>