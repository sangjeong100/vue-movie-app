// Vue.js 애플리케이션에 이미지 로드 기능을 글로벌 플러그인으로 추가하는 코드


export default {
  install(app) { 
    // Vue.js 플러그인은 install 메소드를 정의해야 하며, 이 메소드는 Vue 애플리케이션 인스턴스 app을 인자로 받습니다.
    app.config.globalProperties.$loadImage = src => {
      // Vue 애플리케이션의 전역 프로퍼티에 $loadImage 메소드를 추가합니다. 
      // 이 메소드는 이미지의 src URL을 받아 이미지를 로드하는 기능을 제공합니다.

      return new Promise(resolve => {
        // 이미지가 로드될 때까지 기다리는 Promise를 반환합니다. resolve는 이미지가 성공적으로 로드되었을 때 호출됩니다.
        const img = document.createElement('img');
        img.src = src;
        img.addEventListener('load', () => {
          resolve();
        });
      });
    };
  }
};
