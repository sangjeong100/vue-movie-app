import { createRouter, createWebHistory } from 'vue-router';
import Home from "./views/Home.vue";
import About from './views/About.vue';
import Movie from './views/Movie.vue';
import NotFound from './views/NotFound.vue';


const routes = [
  {
    path: '/', // 최상위 페이지 경로 
    component: Home
  },
  {
    path: '/movie/:id', // movie 상세 페이지 ( params : id )
    component: Movie
  },
  {
    path: '/about',
    component: About 
  },
  {
    // vue router next 공식문서 - dynamic route matching - 404 처리 참고
    path: '/:notFound(.*)', // 404 not found 처리, notFound 라는 문자는 대체가능
    component: NotFound
  },
  
];

const router = createRouter({
  // Hash, History 모드 설정 
  // -Hash 모드: https://google.com/#/home 처럼 # 기호를 사용하는 주소체계 
  history: createWebHistory(),
  
  // 화면 전환시 스크롤이 최상단에 위치하도록 하는 기능 
  // vue router 공식문서에서 advanced 부분에서 scroll behavior찾아볼 수 있음 
  scrollBehavior() {
    return { top: 0 }
  },
  routes: routes  
});

export default router;
