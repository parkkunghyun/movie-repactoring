import { useNavigate } from 'react-router-dom'
import { getBaseImageUrl } from '../utils/getBaseImgURL'

type Movie = {
  id: string,
  popularity: number,
  poster_path: string,
  release_date: Date,
  title: string
}

type Props = {
  movie: Movie
}

const MovieCard = ({movie} : Props) => {
  const navigate = useNavigate();

  const handleDetailMovie = async() => {
    navigate(`/movie/${movie.id}`);
  }
  return (
    <div onClick={handleDetailMovie} className='w-[250px] text-white h-[280px] flex flex-col items-center rounded-2xl px-2 py-4 
      border-2 border-white gap-1 bg-transparent transition-all cursor-pointer hover:scale-110'>
      <img className='w-[100px] h-[200px] rounded' src={`${getBaseImageUrl(movie.poster_path)}`} alt="poster" />
      <div className='flex w-full flex-col items-start '>
        <p className='mb-2'>영화제목: {movie.title}</p>
        <p className='text-sm text-gray-300'>출시일: {movie.release_date.toLocaleString()}</p>
        <p className='text-sm text-gray-300'>평점: {movie.popularity.toFixed(1)}</p>
      </div>
    </div>
  )
}

export default MovieCard