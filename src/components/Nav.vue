<template lang="pug">
el-menu(:default-active="activeIndex", mode="horizontal", :ellipsis="false", class='nav-menu')
    el-menu-item(index='0')
        router-link(:to='{ path: "users" }') Users
    el-menu-item(index='1')
        router-link(:to='{ path: "create" }') Create
    </template>

<script setup lang="ts">
import { ref } from "vue";
const activeIndex = ref("0");
</script>

<style scoped lang="sass">
.nav-menu
    a
        text-decoration: none
</style>
