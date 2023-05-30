import { Form } from "react-bootstrap"
import { userAuth } from "../contexts/AuthContext"
import { useState } from "react"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useContext } from "react"

export const Signin=()=>{
    const navigate=useNavigate()
    const {signin,currentUser}=userAuth()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [checkUser,setCheckUser]=useState(false)

    return(
        currentUser?<Navigate to={'/'}/>:
        <div className="mt-5 p-3 m-auto w-25 border rounded">
            <div>
                <Form.Label className="ms-2 mt-2">Username</Form.Label>
                <Form.Control onChange={(e)=>{setUsername(e.target.value)
                    setCheckUser(false)
                }} placeholder="Username" type="email" required/>
                <Form.Label className="ms-2 mt-2">Password</Form.Label>
                <Form.Control onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" type="password" required/>
                <div className="d-flex flex-column justify-content-center align-items-center">
                {checkUser && <p className="text-danger">username or password is wrong</p>}
                    <button type="submit" className="btn btn-primary w-25 mt-3"
                        onClick={async()=>{
                            const userFound=await signin(username,password)
                            if(userFound){
                                navigate('/')
                            }else{
                                setCheckUser(true)
                            }
                        }}
                    >signin</button>
                    <button style={{border:'none',background:'none'}}><a href="/signup">new user signup?</a></button>
                </div>
            </div>
        </div>
    )
}