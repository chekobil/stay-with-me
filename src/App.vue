<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<template lang="pug">
Nav
router-view
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
