/**
- 해당 컴포넌트는 App.vue의 컴포넌트로 등록되어 사용된다.
- 역할: 네비게이션(메뉴)을 v-for와 RouterLink를 이용하여 구성한다.
- navigations라는 배열 내부에 name과 href 등 링크를 위한 속성값을 갖는 객체를 삽입하여 관리한다.
- store의 'about' 모듈에 있는 state값을 가져온다.
- methods
  ▶ isMatch(): 특정 형식의 url 접근 시 fullpath를 콘솔에 반환한다.
  ▶ toAbout(): routerLink와 to 속성 없이 페이지 이동을 구현하기 위한 함수
*/

<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <!-- 반복문을 활용한 네비게이션 만들기 -->
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- RouterLink: Vue에서 a 태그 대신 사용하는 컴포넌트 -->
        <RouterLink
          :to="nav.href"
          :class="{ active: hasPath(nav.path) }"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
      <div
        class="user"
        @click="toAbout">
        <img 
          :src="image" 
          :alt="name" />
      </div>
    </div>

  </header>
</template>

<script setup>

import Logo from './Logo.vue';

import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useAboutStore } from '../store/useAboutStore';
import { useRoute, useRouter } from 'vue-router';

// about 스토어 선언 
const aboutStore = useAboutStore();
const { name, image } = storeToRefs(aboutStore);


// Vue Router를 사용하여 route와 router 객체 선언
const route = useRoute();
const router = useRouter();

// header menu navigiation 정의 
const navigations = reactive([
  {
    name: 'Search',
    href: '/'
  },
  {
    name: 'Movie',
    href: '/movie/tt4520988',
    path: /^\/movie/ // /movie로 시작하는 경로인 경우의 정규표현식 
  },
  {
    name: 'About',
    href: '/about'
  }
]);

// routerLink의 path 소유 여부 판단 
const hasPath = (path) => { 
  
  if(!path) return false;
  return path.test(route.fullPath); // 경로의 정규표현식을 확인하여 RouterLink의 활성 상태를 결정합니다.

};


const toAbout = () => {
  router.push('/about'); //<RouterLink/>와 to 옵션을 사용하지 않고 링크를 만드는 방법
  // router.push를 사용하여 /about 경로로 이동합니다.
};



</script>

<style lang="scss" scoped>
@use '../scss/main.scss' as *;

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 65px;
    height: 65px;
    padding: 7px; 
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 10px;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($primary, 1%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) { // 부트스트랩 반응형
    .nav{
      display: none;
    }
  }
}
</style>