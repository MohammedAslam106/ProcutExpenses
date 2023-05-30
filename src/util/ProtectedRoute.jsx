import { Navigate,Outlet,Route } from "react-router-dom";
import { userAuth } from "../contexts/AuthContext";
// import { useContext } from "react";

export default function ProtectedRoute(){
    const {currentUser}=userAuth()
    // const user=localStorage.getItem('user')
    console.log(currentUser)
    return ( 
        (currentUser?<Outlet/>:<Navigate to='signin'/>)
    )
}