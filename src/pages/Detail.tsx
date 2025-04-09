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
    <div className="max-w-5xl relative mx-auto mt-16 px-4 text-white flex flex-col md:flex-row gap-10">
      <img
        className="w-full md:w-[400px] rounded-xl shadow-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="flex flex-col justify-center">
        <button onClick={handleLike} className="mb-4 ">
          {liked ? <FaHeart className="text-red-200 text-4xl" /> : <CiHeart className="text-4xl"/>}
        </button>
        <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
        <p className="text-gray-400 mb-2">개봉일: {movie.release_date}</p>
        <p className="text-gray-400 mb-2">평점: {movie.popularity.toFixed(1)}</p>
        <p className="text-gray-400 mb-4">장르: {movie.genres.join(", ")}</p>
        <p className="leading-relaxed">
          {movie.overview ? movie.overview : "영화 설명이 없습니다."}
        </p>
      </div>
    </div>
  );
};

export default Detail;
