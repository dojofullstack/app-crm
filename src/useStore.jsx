import axios from "axios";
import { create } from "zustand";



const getToken = () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken){
        // validar si el token esta activo
        return accessToken
    }
}

const getTokenRefresh = () => {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken){
        // validar si el token esta activo
        return refreshToken
    }
}



const updateAccessToken = () => {

      const refresh = getTokenRefresh();

      if (!refresh){
        return;
      }

      const data = {
        refresh: refresh,
      }

      const API_REFRESH_TK = "https://api.dojofullstack.com/api/auth/jwt/refresh/";

      axios.post(API_REFRESH_TK, data).then((response) => {

          const {access} = response.data;
          console.log(access);
          localStorage.setItem("access", access);

      }).catch(error => {
          console.log(error);
      })

  }




const authUserMe = (set) => {

    const API_USER = "https://api.dojofullstack.com/api/auth/users/me/";

    const accessToken = getToken();
    
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    axios.get(API_USER).then((res) => {
        console.log(res.data);
        set({
            perfil: res.data,
            isLogin: true
        })
    }).catch((error) => {
        localStorage.removeItem("access");
        updateAccessToken();
    })

}



const closeLogin = (set) => {

    set({
        perfil: null,
        isLogin: false
    })

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

}



const useStore = create((set, get) => (
    {
        customers: [],
        updateCustomers: (data) => set({customers: data}), 
        theme: "dark",
        perfil: null,
        isLogin: false,
        updateIsLogin: (data) => set({isLogin: data}),
        updatePerfil: (data) => set({perfil: data}),
        changeTheme: (color) => set({theme: color}),
        accessToken: "",
        refresToken: "",
        authUserMe: () => authUserMe(set),
        closeLogin: () => closeLogin(set)
     }
))



export default useStore;