import { useEffect, useState } from "react";
import { getLikedMovies } from "../utils/localStorage";
import { Link } from "react-router-dom";

const Likes = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    setMovies(getLikedMovies());
  }, []);

  if (movies.length === 0) return <div className="text-white text-center py-20">찜한 영화 없음</div>;

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-md"
          />
          <p className="text-center text-white mt-2">{movie.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Likes;
