import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center">
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default App