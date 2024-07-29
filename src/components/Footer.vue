/**
- 해당 컴포넌트는 App.vue의 컴포넌트로 등록되어 사용된다. 
- 역할: 웹페이지 가장 아래에 표시되는 로고와 개발자 링크를 표시한다. 
*/
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