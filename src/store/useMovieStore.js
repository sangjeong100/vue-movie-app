import axios from 'axios';
import _iniqBy from 'lodash/uniqBy';
import { defineStore } from 'pinia';

// lodash: npm i lodash 명령어를 통해서 설치, 공식문서 있으니 구글링 권장 
// uniqBy: 객체 데이터가 담긴 배열에서 특정 값(ex. key)을 기준으로 설정하여 
//         배열의 중복값을 제거하는 라이브러리

// 언더바(_)를 갖는 변수명은 해당 파일에서만 사용하는 변수임을 명시 ( private )
const _defaultMessage = 'Search for the move title!';

export const useMovieStore = defineStore('useMovieStore', {
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false, // 로딩 아이콘 표시
    theMovie: {} // 영화 상세 정보 객체 
  }),
  actions: {
    setMovies(movies) {
      Object.assign(this.movies. movies);
    },
    setMessage(message) {
      this.message = message;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setTheMovie(theMovie) {
      this.theMovie = theMovie;
    }
  }

});