import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./views/App"
import Register from "./views/auth/Register"
import Login from "./views/auth/Login"



const Rutas = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<App/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />

            </Routes>
        
        </BrowserRouter>
    )
}

export default Rutas;