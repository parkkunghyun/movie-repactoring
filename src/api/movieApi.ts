import axios from "axios"

const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

// GET https://api.themoviedb.org/3/search/movie?api_key=&query=범죄도시&language=ko-KR

export const searchMovies = async(searchInput: string) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: MOVIE_API_KEY,
                query: searchInput,
                language: "ko-KR"
            }
        });

        const data = response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            popularity: movie.popularity,
            poster_path: movie.poster_path,
        }))

        return data;
    } catch(e) {
        console.log("영확 검색 에러", e);
        throw e;
    }
}

// https://api.themoviedb.org/3/movie/479718?api_key=73c6f0aace5c27ab0aa059e980d861ac&language=ko-KR

export const DetailMovies = async (movieId: string) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: MOVIE_API_KEY,
          language: "ko-KR",
        },
      });
  
      const movie = res.data;
  
      const data = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        overview: movie.overview,
        genres: movie.genres.map((g: any) => g.name), // 장르만 이름만 뽑기
      };
  
      return data;
    } catch (e) {
      console.log("영화 상세 에러", e);
      throw e;
    }
  };
  