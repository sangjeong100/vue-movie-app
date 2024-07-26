<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/sangjeong100/vue-movie-app.git"
      target="_blank"
      >(c) {{  new Date().getFullYear() }} Sjyu</a>
  </footer>
</template>

<script setup>

import Logo from './Logo.vue';

</script>

<style lang="scss" scoped>
 footer {
   padding: 70px;
   text-align: center;
   opacity: .3;

   .logo {
     display: block;
     margin-bottom: 4px;
   }
 }
</style>