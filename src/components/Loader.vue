/**
- 해당 컴포넌트는 MovieList.vue, MovieItem.vue, Movie.vue, About.vue의 컴포넌트로 등록되어 사용된다.
- 역할: 페이지 로딩 중 화면에 출력되는 로딩 아이콘(spinner)
- props: spinner의 기본 속성값을 설정하여 등록한다.
*/
<template>
  <div
    :style="{
      width: `${size}rem`, // default => 2rem
      height: `${size}rem`, // default => 2rem
      zIndex 
      // vue 스타일 바인딩에서는 대쉬 케이스를 카멜케이스로 자동변환함
      // z-index == zIndex, 'z-index': zIndex와 동일
      // html에서 데이터 바인딩으로 사용할 때에는 대쉬 케이스만 사용.
      // Movie.vue에서 확인가능 

    }"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps(['size','absolute','fixed','zIndex']);

</script>

<style lang="scss" scoped>

@use "../scss/main.scss" as *;

.spinner-border {
  // margin 부터 right 까지 absolute 또는 fixed일 때, 
  // 가운데 배치를 위해 사용되는 css
  margin: auto; 
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute{
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}

</style>