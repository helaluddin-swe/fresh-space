import { Router, useNavigate } from "react-router-dom"
import { BadgePlus, CirclePlus, Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"


const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const navigate = useNavigate()
    return (
        <div className="  items-center px-4 py-4 bg-gray-300 h-16 w-full border-b ">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">DestinationRelax</h1>
                <div className={`hidden md:flex gap-4 text-2xl font-bold ${isDarkMode ? "text-blue-600" : "text-blue-600"} `} onClick={()=>navigate("/hotel-list")}><button>Hotel List</button>
                    <button>Blog</button>
                    <button>Login</button> </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/addhotel")}
                        className="px-4 py-2 transition"
                    >

                        <CirclePlus size={24} className=" text-black" />
                    </button>
                    <button className="text-black" onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}>{isDarkMode ? <Sun /> : <Moon />}</button></div></div>
        </div>
    )
}

export default Header
