import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';
import { defineStore } from 'pinia';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

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
      Object.assign(this.movies, movies);
    },
    setMessage(message) {
      this.message = message;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setTheMovie(theMovie) {
      this.theMovie = theMovie;
    },
    resetMovie() {
      // 상태 값 초기화 
      this.movies = [];
      this.message = _defaultMessage;
      this.loading = false;
    },
    // 영화 검색 비동기 함수
    async searchMovie(title, type, number ,year) {

      if(this.loading) return; // 이미 검색중이라면 방어 

      this.setMessage(''); // message 초기화 
      this.setLoading(true);

      
      try{
        
        let payload = {
          title: title, 
          type: type,
          number: number,
          year: year,
          page: 1
        };

        const response = await this._fetchMovies(payload);

        if(response.data.Response === "False"){

          throw new Error(response.data.Error);
        }
        const { Search, totalResults } = response.data; // imdb API에 보면 res 안에 저런 데이터가 들어있음 


        this.setMovies(_uniqBy(Search, 'imdbID')); // imdbID라는 키를 기준으로 중복 값을 걸러준다. 
        
       

        const total = parseInt(totalResults, 10); // totalResults를 10진법의 숫자로 변형한다.
        const pageLength = Math.ceil(total/10); // total을 10으로 나눈값을 올림처리 - 페이지 개수 설정
        
        // 추가요청 
        if (pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1) {
            if(page > (number / 10)) break  // 한 페이지에서 읽는 데이터의 수를 검증 number 기본값은 10

            payload.page = page;

            const res = await this._fetchMovies(payload);
            const { Search } = res.data;
            this.setMovies([...this.movies, ..._uniqBy(Search, 'imdbID')]);
          }
        }

      } catch(error) {
        console.log(error);
        
        this.setMovies([]);
        this.setMessage(error.message);
        
      } finally {
        this.setLoading(false);
      }
    },
    // id로 검색하기 
    async searchMovieById(id) {

      if(this.loading) return;

      this.setTheMovie({});
      this.setMessage('');
      this.setLoading(true);

      try{
        const response = await this._fetchMovies({id: id});

        this.setTheMovie(response.data);

      } catch(error) {
        this.setTheMovie({});
      } finally{
        this.setLoading(false);
      }
    },
    // 언더바로 시작하는 함수는 현재 파일에서만 사용되는 함수임을 의미한다. 
    // fetchMovies(): 영화 데이터를 가져오는 메소드
    async _fetchMovies(payload) {
      const { title, type, year, page, id} = payload;

      const url = id  // id값이 있는 경우와 없는 경우를 나눈 삼항연산자
          ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
          : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    
      const response = await axios.get(url);

      return response;

    },

  }

});