/**
- 해당 컴포넌트는 Home.vue의 컴포넌트로 등록되어 사용된다.
- 역할: 영화 검색에 필요한 input 태그 및 필터(select - options), 검색기능을 관리한다.
- methods
   ▶ apply(): 입력된 검색정보를 movieStore의 searchMovies() 메소드의 매개변수로 전달한다.
*/
<template>
  <div class="container">
    <input 
      v-model="title"
      class="form-control"
      type="text"
      ref="searchInput"
      placeholder="Search for movies, series, & more"
      @keyup.enter="apply" 
    />
    <div class="selects">
      <select 
        v-model="type"
        class="form-select"
      >
        <option v-for="item in filters[0].items"
          :key="item"
          :value="item"
        >
        {{ item }}
        </option>
      </select>
      <select 
        v-model="number"
        class="form-select"
      >
        <option v-for="item in filters[1].items"
          :key="item"
          :value="item"
        >
        {{ item }}
        </option>
      </select>
      <select 
        v-model="year"
        class="form-select"
      >
        <option value="" selected>All Years</option>
        <option v-for="item in filters[2].items"
          :key="item"
          :value="item"
        >
        {{ item }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">
      Apply
    </button>
  </div>
</template>

<script setup>

import { ref, reactive, nextTick } from 'vue';
import { useMovieStore } from '../store/useMovieStore';

const movieStore = useMovieStore();

const title = ref("");
const type = ref("movie");
const number = ref(10);
const year = ref("");
const filters = reactive([
  {
    name:'type',
    items:['movie', 'series','episode']
  },
  {
    name: 'number',
    items: [10,20,30]
  },
  {
    name: 'year',
    items: (() => {
      const years = [];
      const thisYear = new Date().getFullYear(); // 현재 년도를 가져옴
      for (let i = thisYear; i >= 1985; i -= 1) {
        years.push(i);
      }
      return years;
    })()
  }
]);

const searchInput = ref(null);

// search movie
const apply = async () => {
  if(title.value === ""){
    alert("검색어를 입력해주세요.");
    
    await nextTick();
    // nextTick은 Vue.js에서 제공하는 유틸리티 함수로, 
    // DOM 업데이트가 완료된 후 다음 틱(즉, 다음 이벤트 루프 사이클)에서 특정 작업을 수행할 수 있게 해줍니다. 
    // 이는 비동기 작업을 처리하거나 DOM이 업데이트된 후에 특정 작업을 보장하는 데 유용합니다.
    searchInput.value.focus();
    return;
  }

  movieStore.searchMovie(title.value, type.value, number.value, year.value);
};



</script>

<style lang="scss" scoped>

@use '../scss/main.scss' as *;

.container {
  display: flex;
  > * {
     margin-right: 10px;
     font-size: 15px;
     &:last-child {
       margin-right: 0 ;
     }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0  ;
  }
  @include media-breakpoint-down(lg) { // 부트스트랩 반응형
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}



</style>