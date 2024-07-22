import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'; // pinia
import router from './routes';
// 어떤 폴더안에 있는 index.js 파일을 가져올 때는 파일명을 생략할 수 있다. 
// 그러므로 자주 사용되는 파일을 만들 때 index라는 이름을 사용하는 것이 좋다. 


// SCSS 파일 불러오기
import './scss/main.scss';


const pinia = createPinia();


createApp(App)
.use(pinia)
.use(router)
.mount('#app');
