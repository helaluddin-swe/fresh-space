import { createContext, useContext, useEffect, useState } from "react"


const ThemeContext=createContext()
export const useTheme=()=>useContext(ThemeContext)

const ThemeProvider = ({children}) => {
    const [theme,setTheme]=useState(localStorage.getItem("theme"))
    useEffect(()=>{
        const root=window.document.documentElement
        if(theme==="dark"){
            root.classList.add("dark")
            document.body.style.backgroundColor="#000"
            document.body.style.color="#fff"
        }else{
             root.classList.remove("dark")
            document.body.style.backgroundColor="#fff"
            document.body.style.color="#000"
        }
        localStorage.setItem("theme",theme)
    })
    const toggleDarkMode=()=>{
        setTheme((preTheme)=>preTheme==="dark"?"light":"dark")
    }
  return (
   <ThemeContext.Provider value={{isDarkMode:theme==="dark",toggleDarkMode}}>
    {children}
   </ThemeContext.Provider>
  )
}

export default ThemeProvider
