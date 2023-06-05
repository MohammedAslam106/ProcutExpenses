import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useContext } from "react"

const AuthContext=createContext()
const BASE_URL=import.meta.env.VITE_BASE_URL

export const userAuth=()=>{
    return useContext(AuthContext)
}
// export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null)
    useEffect(()=>{
        console.log('its rendered')
        const user=localStorage.getItem('user')
        if(user){
            setCurrentUser(JSON.parse(user))
        }
    },[])
    const signup= async (name,username,password)=>{
        const response=await axios.post(`${BASE_URL}/api/auth/signup`,{
            name,username,password
        })
        if(response.status===200){
            return response
        }
        return false
    }
    const signin=async (username,password)=>{
        await axios.post(`${BASE_URL}/api/auth/signin`,{
            username,password
        }).then((response)=>{
            console.log(response.data)
            const user=response.data
            setCurrentUser(response.data)
            localStorage.setItem('user',JSON.stringify(user))
            return true
        }).catch(error=>{
            console.log(error)
            return false
        })
    }
    const signout=()=>{
        setCurrentUser(null)
        localStorage.clear()
    }
    return(
        <AuthContext.Provider value={{currentUser, signin, signup,signout}}>
            {children}
        </AuthContext.Provider>
    )
}



