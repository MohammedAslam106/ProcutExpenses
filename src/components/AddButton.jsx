import { useState } from "react"
import {TbCross, TbCurrencyDollar, TbHash, TbMinus, TbPlus} from "react-icons/tb"
import {GoSignOut} from 'react-icons/go'
import { userAuth } from "../contexts/AuthContext"
import { useContext } from "react"

export default function AddButton({setExpenseBtn, setCategoryBtn}){
    const {signout}=userAuth()
    const [addBtn,setAddBtn]=useState(false)
    return (
        <div>{addBtn &&
            (<div style={{
            marginBottom: "7.5rem",
            marginRight: "3.25rem",
            flexDirection: "column",
            gap: "5px",
          }} 
          className="position-fixed bottom-0 end-0 d-flex">
                <button className='btn btn-primary rounded-circle  p-3' onClick={()=>setCategoryBtn(true)}>
                    <TbHash size={22} />
                </button>
                <button className='btn btn-primary rounded-circle  p-3' onClick={()=>setExpenseBtn(true)}>
                    <TbCurrencyDollar size={22} />
                </button >
                <button className='btn btn-primary rounded-circle  p-3' onClick={()=>signout()}>
                    <GoSignOut size={22}/>
                </button>
            </div>)
        }
            <button className='position-fixed bottom-0 end-0 mb-5 me-5 btn btn-primary rounded-circle  p-3'
            onClick={()=>{setAddBtn(!addBtn)}}
            >
                {addBtn?<TbMinus  size={30} />:<TbPlus size={30}/>}
            </button>
        </div>
    )
}
