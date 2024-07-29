<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"  
        absolute/>
      <img 
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script setup>

import { storeToRefs } from "pinia";
import { useAboutStore } from "../../store/useAboutStore";
import { ref, onMounted, getCurrentInstance } from "vue";

const { appContext } = getCurrentInstance(); // Vue instance 가져옴 

const aboutStore = useAboutStore();
const { name, email, blog, phone, image } = storeToRefs(aboutStore);

const imageLoading = ref(true);

onMounted(() => {
  init();
});

const init = async () => {
  await appContext.config.globalProperties.$loadImage(image.value);
  imageLoading.value = false;
}



</script>
<style lang="scss" scoped>

@use "../../scss/main.scss" as *;

.about {
  text-align: center;
  .photo {
    width:250px;
    height: 250px;
    margin: 40px auto 20px; //상 중 하
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>