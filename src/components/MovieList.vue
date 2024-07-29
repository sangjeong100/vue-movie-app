/**
- 해당 컴포넌트는 Home.vue의 컴포넌트로 등록되어 사용된다.
- 역할: 검색 정보를 바탕으로 OMDb_API 에서 반환된 영화 리스트를 출력한다.
- components: MovieItem(각 영화의 상세정보), Loader(로딩 중 출력되는 spinner)
- movieStore의 state를 가져온다.
*/
<template>
  <div class="container">
    <div 
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <Loader v-if="loading" />
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else 
        class="movies">
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie">{{ movie.imdbID }}</MovieItem>

      </div>
    </div>
  </div>
</template>

<script setup>

import Loader from "./Loader.vue";
import MovieItem from "./MovieItem.vue";

import { ref } from 'vue';
import { useMovieStore } from "../store/useMovieStore";
import { storeToRefs } from 'pinia';

const movieStore = useMovieStore();
const { movies, message, loading } = storeToRefs(movieStore);




</script>

<style lang="scss" scoped>

@use "../scss/main.scss" as *;

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message{
    color: $gray-400;
    font-size: 20px;
  }
  .movies{
    display: flex;
    flex-wrap: wrap; // flex 줄바꿈 처리 
    justify-content: center;
  }
}
</style>