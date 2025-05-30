import  Cookies from "js-cookie";
import {useState, createContext, useContext } from "react";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const[authUser, setAuthUser]=useState(()=>{
        return localStorage.getItem("token") ||Cookies.get("jwt")||null
    })
    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth=()=> useContext(AuthContext)