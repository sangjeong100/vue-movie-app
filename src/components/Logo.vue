/**
- 역할: 로고 클릭 시 Home으로 이동하는 링크를 담당한다. 
 */
<template>
  <RouterLink
    to="/"
    class="logo"> <!-- :to 는 문자열또는 객체, to는 url -->
    <span>OMDbAPI</span>.com
  </RouterLink>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@use '@/scss/main.scss' as *;


.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black; // main.scss의 bootstrap의 variables 파일에서 넘어오는 변수
  text-decoration: none;
  &:hover { //가상 클래스 선택자 
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>