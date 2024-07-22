import { defineStore } from 'pinia';

export const useAboutStore = defineStore('about', {
  state: () => ({
    name: 'Sjyu',
    email: 'sangjeong100@gmail.com',
    blog: 'https://sangjeong1011.tistory.com',
    phone: '+82 10-0000-0000',
    image: 'https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F4026653%2Fattach%2F6a39c74eb5e94b5bbe9b4c9045ec4b00'
  }),
  persist: true,
});