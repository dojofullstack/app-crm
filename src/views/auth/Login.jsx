import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useStore from "../../useStore";


const API_LOGIN = "https://api.dojofullstack.com/api/auth/jwt/create/";



const FormLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loadingLogin, setLoadingLogin] = useState(false);

    const navigate = useNavigate();

    // const perfil= useStore((state) => state.perfil);
    const updatePerfil = useStore((state) => state.updatePerfil);
    const updateIsLogin = useStore((state) => state.updateIsLogin);


    console.log(updateIsLogin);



    const loginUser = () => {

      setLoadingLogin(true);

        const data = {
            username,
            password
        }

        axios.post(API_LOGIN, data).then((response) => {
            

            const {access, refresh} = response.data;

            console.log(access);
            console.log(refresh);

            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);

            setLoadingLogin(false);
            
            toast.success('🦄 Welcome User!!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });

            updateIsLogin(true);
            
            setTimeout(() => {
                navigate("/");
            }, 2000); // Espera 3 segundos antes de navegar


        }).catch(error => {
            setLoadingLogin(false);
            console.log(error);
            
        })

    }
 

  return (
    <>
      <div className="container w-full p-5 flex justify-center my-16 ">


        <div className="flex  flex-col w-6/12 gap-4">

            <h2 className="text-3xl font-bold">Iniciar Sesion</h2>


        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username"  value={username} onChange={(e) =>  setUsername(e.target.value) } />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" placeholder="Ingresar contrasena" className="grow" value={password} onChange={(e) =>  setPassword(e.target.value) } />
        </label>
        
        <button className="btn btn-accent text-xl"  onClick={loginUser} >

             {loadingLogin && <span className="loading loading-spinner"></span> }
            Login
        </button>


        <div className="toast">
  <div className="alert alert-info">
    <span>New message arrived.</span>
  </div>
</div>



        </div>

      </div>
    </>
  );
};

const Login = () => {

  const navigate = useNavigate();
  const isLogin = useStore((state) => state.isLogin);


  //cambios
  useEffect(() => {
    if (isLogin){
      navigate("/");
    }
});



    return (
        <>
        <Header />
    
        <FormLogin />
    
        <Footer />
      </>
    )

};


export default Login;