import { createContext, useState } from "react";



export const ThemeContext = createContext();



const ThemeProvider = ({children}) => {

    const [theme, setTheme] =  useState("orange");
    const [perfil, setPerfil] =  useState("");


    const changeTheme = (color) => {
        setTheme((theme) => color );
    }


    return (
        <>
        
        <ThemeContext.Provider value={{
            theme: theme,
            perfil: perfil,
            changeTheme: changeTheme
        }}>

            {children}

        </ThemeContext.Provider>
        
        </>
    )
}

export default ThemeProvider;