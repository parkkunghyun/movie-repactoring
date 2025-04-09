import  { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { searchMovies } from '../api/movieApi';
import { Link } from 'react-router-dom';

type Movie = {
  id: string,
  popularity: number,
  poster_path: string,
  release_date: Date,
  title: string
}

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movieData, setMovieData] = useState([]);

  const handleSearchMovies = async() => {
    setIsLoading(false)
    setError(null)
    try{
      setIsLoading(true)
      const response = await searchMovies(searchInput);
      console.log(response);
      setMovieData(response);
    } catch(e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false)
    }
  }
  
  if (error) {
    return (<div className='w-full mt-10 flex items-center justify-center flex-col mx-auto min-h-screen'>
      <p>영화를 가져오던 중 에러가 발생했습니다... <br />{error}</p>
    </div>)
  }
  return (
    <div className='w-full mt-10 flex items-center flex-col mx-auto min-h-screen'>
      <div className='bg-white w-[300px] rounded-full flex items-center px-4 py-2'>
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          className='flex-1 focus:outline-none flex-wrap font-bold outline-none'
          type="text" />
        <FaSearch onClick={handleSearchMovies}
          className='cursor-pointer hover:scale-110'/>
      </div>

      {isLoading ? <p>로딩 중입니다...</p> : (
        <div className='grid gap-8 mt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
          movieData.map((movie: Movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-[200px] shadow-md"
              />
              <p className="text-center text-white mt-2">{movie.title}</p>
            </Link>
          ))
        }
        </div>
      ) }
    </div>
  )
}

export default Home