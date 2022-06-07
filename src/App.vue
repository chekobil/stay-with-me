<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import UserList from "./components/UserList.vue";
</script>

<template>
  <UserList />
</template>

<style lang="sass">
body, html
  margin: 0
  padding: 0
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  //
  width: min(920px, calc(100vw - 2rem))
  padding: 0 1rem
  margin: 2rem auto
</style>
