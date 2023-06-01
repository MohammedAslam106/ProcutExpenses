import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { userAuth } from '../contexts/AuthContext';
import axios from 'axios';

function CategoryForm({categoryBtn,setCategoryBtn}) {
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [checkCategory,setCheckCategory]=useState(false)
    const {currentUser}=userAuth()

    async function allCategories (title,desc){
        console.log(currentUser.message)
        const token=`Bearer ${currentUser.message}`
        const response=await axios.post('http://localhost:3000/api/categories',
        {title:title,description:desc},{
          headers:{
            Authorization:token
          }
        })
        console.log(response)
        if(response.status===200){
          setTitle('')
          setDesc('')
          setCategoryBtn(false)
        }
      }
    // useEffect(()=>{
    //   category?.map((cat)=>{
    //     console.log(cat)
    //     if(title==cat.title){
    //       return setCheckCategory(true)
    //     }
    //     else{
    //       setCheckCategory(false)
    //     }
    //   })
    // },[title])
  return (
      <Modal show={categoryBtn} onHide={()=>setCategoryBtn(false)} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton onClick={()=>setCategoryBtn(false)}>
          <Modal.Title>Add a category</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <div>
            <Form.Label className='mt-2 title' >Title</Form.Label>
            {checkCategory && (<p className='text-danger'>Category allready exist </p>)}
            <Form.Control type='text' placeholder='Enter the title' onChange={(e)=>{
              setTitle(e.target.value)
            }}/>

            <Form.Label className='mt-2 desc'>Description</Form.Label>
            <Form.Control as="textarea" placeholder='Write the description' onChange={(e)=>{
                setDesc(e.target.value)
            }}/>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setCategoryBtn(false)}>Close</Button>
          <Button variant="primary" onClick={async ()=>{
            // if(checkCategory){
            //     return
            // }
              // const details=[...category,{title:title,description:desc}]
              // setCategory(details)
              const category=await allCategories(title,desc)
              
          }}>Save changes</Button>
        </Modal.Footer>

      </Modal>
  );
}

export default CategoryForm;