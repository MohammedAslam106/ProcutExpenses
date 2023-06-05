import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Badge } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { userAuth } from '../contexts/AuthContext';
import { useContext } from 'react';
import {RxCross2} from 'react-icons/rx'

const CategoryDropdown=({categories,setCategories})=>{
  const {currentUser}=userAuth()
  const [category,setCategory]=useState([])
  useEffect(()=>{
    const allcategories=async()=>{
      const BASE_URL=import.meta.env.VITE_BASE_URL
      const response=await axios.get(`${BASE_URL}/api/categories`,{headers:{
        Authorization:`Bearer ${currentUser.message}`
      }})
      if(response.status===200){
        setCategory(response.data)
      }
    }
    allcategories()
  },[])
    return(
    <>
    <div className='d-flex flex-wrap gap-2 m-2'>
    {categories?.map((cat)=>{
          return(
            <div key={cat}>
              <Badge className='bg-secondary ' key={cat}>
                {category.find((val)=> val._id===cat)?.title}
                <RxCross2 className='ms-1 '
                  style={{cursor:'pointer'}}
                  onClick={()=>{
                    setCategories((prev)=>
                      prev.filter((p) => p!==cat)
                    )
                  }}
                />
                
              </Badge>

            </div>
          )
        })}
    </div>
    <Dropdown  className='mt-2' id="dropdown-basic-button" title="Dropdown button">
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Category
      </Dropdown.Toggle>
      <Dropdown.Menu style={{height:'100px',overflow:'auto'}}>
              {category.filter((val)=> !categories?.includes(val._id))?.map((cat,id)=>{
                  return(
                  <Dropdown.Item key={cat._id} onClick={()=>{
                    setCategories((prev)=>[...prev, cat._id])
                    }}>
                  {cat.title}</Dropdown.Item>
                )
              })}
      </Dropdown.Menu>
    </Dropdown>
    </>
    )
}

export default CategoryDropdown;