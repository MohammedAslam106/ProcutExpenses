import axios from "axios"
import {TbEye, TbEyeOff} from 'react-icons/tb'
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { Form } from "react-bootstrap"
import { useContext } from "react"
import { userAuth } from "../contexts/AuthContext"

export const Signup=()=>{
    const {signup}=userAuth()
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [showPassword,setShowPassword]=useState(false)
    const [showIt,setShowIt]=useState('password')

    const [checkUser,setCheckUser]=useState(false)
    return(
        <div style={{width:'300px'}} className="mt-5 p-3 m-auto  border rounded">
            <div>
                <Form.Label className="ms-2 mt-2">Name</Form.Label>
                <Form.Control placeholder="Name" type="text" required onChange={(e)=>setName(e.target.value)}/>
                <Form.Label className="ms-2 mt-2">Username</Form.Label>
                <Form.Control placeholder="Username" type="email" required onChange={(e)=>{
                    setCheckUser(false)
                    setUsername(e.target.value)}}/>
                <Form.Label className="ms-2 mt-2">Password</Form.Label> 
                <button style={{border:'none',background:'none'}} className="ms-2" onClick={()=>{
                    setShowPassword(!showPassword)
                    showIt==='password' ? setShowIt('text') : setShowIt('password')
                }}>{showPassword ? <TbEye/> : <TbEyeOff/>}</button>
                <Form.Control placeholder='password' type={showIt}  required onChange={(e)=>setPassword(e.target.value)}/>
                <Form.Label className="ms-2 mt-2">Confirm Password</Form.Label>
                <Form.Control placeholder="Confirm Password" type={showIt} required onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <div className="d-flex flex-column justify-content-center align-items-center">
                {checkUser && <p className="text-danger mt-3">user already exist</p>}
                    <button  type="submit" className={'btn btn-primary w-50 ' + `${checkUser?'mt-0':'mt-3'}`} onClick={async ()=>{
                        
                        if(password!==confirmPassword){
                            return
                        }
                        const userCreated=await signup(name,username,password)
                        console.log(userCreated.data.message)
                        if(userCreated.data.message==`E11000 duplicate key error collection: expense_tracker.users index: username_1 dup key: { username: "${username}" }`){
                            setCheckUser(true)
                        }else{
                            navigate('/signin')
                        }
                    }}>signup</button>
                    <button style={{background:'none',border:'none'}}  className="w-100">
                       <a href="/signin">All ready have an account signin?</a> </button>
                </div>

            </div>
        </div>
    )
}