import { RiMovie2AiLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { GrLike } from "react-icons/gr";

const Navbar = () => {
  return (
    <div className='w-full font-bold text-white border-b-2 h-[80px] flex p-4 items-center justify-between'>

      <Link to="/">
        <RiMovie2AiLine className='text-4xl cursor-pointer hover:scale-110'/>
      </Link>

      <ul className='flex items-center gap-8 mr-8 text-xl cursor-pointer md:mr-4'>
        <Link to="/likes" className='flex items-center gap-1 hover:scale-110'> <GrLike/> Likes</Link>
      </ul>
    </div>
  )
}

export default Navbar