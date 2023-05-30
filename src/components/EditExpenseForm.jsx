import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import CategoryDropdown from './CategoryDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userAuth } from '../contexts/AuthContext';

function EditExpenseForm({editExpenseForm,setEditExpenseForm,editExpense}) {
  const [title,setTitle]=useState('')
  const [expense,setExpense]=useState('')
  const [date,setDate]=useState('')
  const[description,setDescription]=useState('')
  const[categories,setCategories]=useState([])
  const {currentUser}=userAuth()
  const temp='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFudSIsInVzZXJuYW1lIjoiamFudUBqYW51IiwiaWQiOiI2NDY4NWY3NmVmNTE4MTQxNDQyMzBlYjMiLCJpYXQiOjE2ODQ3MzI2ODV9.C72F3Z08fmLRf6c-sADM_gE_1nocZmYnN3nnXohEngk'
  const formSubmission=async()=>{
    const id=editExpense._id
    await axios.patch(`http://localhost:3000/api/expenses/${id}`,{
      title:title,amount:expense,date:date,description:description,categories:categories
    },{headers:{
      Authorization:`Bearer ${temp}`
    }}).then((response)=>{
      console.log(response)
      setTitle('')
      setDescription('')
      setExpense('')
      setDate('')
      setEditExpenseForm(false)
      }
    ).catch((error)=>{console.log(error.message)})
    
  }
//   useEffect(()=>{
//     editExpense.categories?.map((cat)=>{
//         console.log(cat._id)
//         return setCategories([...categories,cat._id,])
//     })
//   },[setEditExpenseForm])
  useEffect(()=>{
    console.log(editExpense)
    setExpense(editExpense.amount)
    setDate(editExpense.date.slice(0,10))
    setDescription(editExpense.description)
    setCategories([])
    setTitle(editExpense.title)
  },[editExpenseForm,setEditExpenseForm])
  return (
      <Modal show={editExpenseForm} onHide={()=>setEditExpenseForm(false)} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton onClick={()=>setEditExpenseForm(false)}>
          <Modal.Title style={{marginLeft:'9rem'}}>Add an expense</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <Form>
            <div className='d-flex flex-row justify-content-between '>
              <div>
                <Form.Label className='ms-2'>
                  Expense
                </Form.Label>
                <Form.Control value={expense}  type='Number' placeholder='₹0.000' onChange={(e)=>setExpense(e.target.value)}/>
              </div>
              <div>
                <Form.Label className='ms-2'>
                  Date
                </Form.Label>
                <Form.Control value={date?.slice(0,10)}  type='date' placeholder='Enter the date' onChange={(e)=>setDate(e.target.value)}/>
              </div>
            </div>
            <Form.Label className='mt-2'>Title</Form.Label>
            <Form.Control value={title}  type='text' placeholder='Enter the title' onChange={(e)=>setTitle(e.target.value)}/>

            <Form.Label className='mt-2'>Description</Form.Label>
            <Form.Control value={description} as="textarea" placeholder='Write the description' onChange={(e)=>setDescription(e.target.value)}/>

            <CategoryDropdown
              className='m-auto'
            //   editCategories={editExpense.categories}
              categories={categories}
              setCategories={setCategories}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setEditExpenseForm(false)}>Close</Button>
          <Button variant="primary" onClick={()=>{
            formSubmission()
            }}>Save changes</Button>
        </Modal.Footer>

      </Modal>
  );
}

export default EditExpenseForm;