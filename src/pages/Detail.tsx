import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DetailMovies } from "../api/movieApi";

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { getLikedMovies, toggleLikeMovie } from "../utils/localStorage";

type MovieType = {
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  genres: string[];
  overview: string;
};

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const data = await DetailMovies(id);
          setMovie(data);

          const likedMovies = getLikedMovies();
          setLiked(likedMovies.some((m) => m.id === data.id))
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchMovie();
  }, [id]);

  const handleLike = () => {
    if (!movie) return;
    toggleLikeMovie({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    });
    setLiked((prev) => !prev);
  }

  if (!movie) return <div className="text-white text-center py-20">로딩중...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 text-white flex flex-col md:flex-row gap-10">
      <img
        className="w-full md:w-[400px] rounded-xl shadow-lg object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="flex flex-col justify-center w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <button onClick={handleLike}>
            {liked ? (
              <FaHeart className="text-red-400 text-3xl" />
            ) : (
              <CiHeart className="text-3xl" />
            )}
          </button>
        </div>
  
        <p className="text-gray-400 mb-2">개봉일 | {movie.release_date}</p>
        <p className="text-gray-400 mb-2">인기도 | {movie.popularity.toFixed(1)}</p>
  
        <div className="flex flex-wrap gap-2 my-4">
          {movie.genres.map((genre, idx) => (
            <span
              key={idx}
              className="bg-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
  
        <p className="leading-relaxed text-gray-300">
          {movie.overview ? movie.overview : "영화 설명이 없습니다."}
        </p>
      </div>
    </div>
  );
  
};

export default Detail;
