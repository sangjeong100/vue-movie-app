/**
- 해당 컴포넌트는 MovieList.vue의 컴포넌트로 등록되어 사용된다.
- 역할: MovieList.vue에서 출력된 영화 리스트 중 하나를 클릭하면 해당 영화의 상세정보를 출력하는 부분
- components: Loader
- props: movie 객체를 상위 component인 MovieList.vue로 부터 받아온다.
- imageLoading 변수를 이용하여 Loader의 출력 여부를 설정한다.
- mounted(): 해당 라이프 사이클 시점에서 init() 메소드를 실행한다.
- methods
   ▶ init(): 영화 poster가 로딩되는 동안 동작하는 함수로, 각 영화의 poster 유무를 확인하여 포스터가 없는 경우 예외처리 후 Loader의 작동을 종료한다. 
      poster가 있는 경우, loadImage 플러그인을 실행 후 Loader의 작동을 종료한다.
*/
<template>
  <!-- 라우터 링크를 사용하여 검색된 영화를 클릭하면 상세페이지로 나오도록 하는 기능 -->
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading" 
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script setup>

import { defineProps, ref, onMounted, getCurrentInstance } from 'vue';
import Loader from './Loader.vue';

const props = defineProps(['movie']);
const imageLoading = ref(true);

const { appContext } = getCurrentInstance(); // 현재 Vue 인스턴스를 가져옵니다.


// movieItem dom mount 되면, image loader 제거 
onMounted(() =>{
  init();
});

const init = async () => { // 이미지가 로딩될 동안 작동할 함수 
      // const img = document.createElement('img')
      // img.src = this.movie.Poster // img.src에 포스터의 이미지 주소가 들어감 
      // img.addEventListener('load', () => { // 화살표 함수로 작성해야 전역변수의 느낌으로 this를 통해 접근 가능 
      // // 만약 function() {return} 이런 형식으로 사용하면 this는 메소드 내의 변수에만 접근 가능하기 때문
      //   this.imageLoading = false // 이미지 로딩이 완료되면 false로 바꿈 
      // }) 이 부분이 loadImage.js에 정의한 plugin으로 대체됨. 아래는 플러그인 호출하는 코드
      const poster = props.movie.Poster
      if(!poster || poster==='N/A') { // 포스터 정보가 없을때의 예외처리
        imageLoading.value = false;
      } else {
        await appContext.config.globalProperties.$loadImage(poster); 
        // Vue 인스턴스를 통해 $loadImage 호출
    
        // loadImage 플러그인이 비동기로 promise를 반환하기 때문에 async와 await 키워드를 붙여줌
        imageLoading.value = false;
      }
    }

</script>

<style lang="scss" scoped>

@use "../scss/main.scss" as *;

.movie {
  $width:200px;
  width: $width;
  height: calc($width * 3 / 2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after { // & - 가상선택자, ::after - 가상요소
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 6px solid $primary;

  }
  .info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba($black, 0.3);
    padding: 14px;
    text-align: center;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;

    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>