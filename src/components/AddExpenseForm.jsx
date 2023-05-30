import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import CategoryDropdown from './CategoryDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userAuth } from '../contexts/AuthContext';

function ExpenseForm({expenseBtn,setExpenseBtn,editExpense=null}) {
  const [title,setTitle]=useState('')
  const [expense,setExpense]=useState('')
  const [date,setDate]=useState('')
  const[description,setDescription]=useState('')
  const[categories,setCategories]=useState([])
  const {currentUser}=userAuth()
  useEffect(()=>{
    if(editExpense!==null){
      console.log(editExpense)
    setExpense(editExpense.amount)
    setDate(editExpense.date?.slice(0,10))
    setDescription(editExpense.description)
    setTitle(editExpense.title)
    setCategories(editExpense.categories?.map(cat=>{
      return cat._id
    }))
    console.log(categories)
    if(!categories){
      setCategories([])
    }
  }


  },[expenseBtn,setExpenseBtn])
  const temp='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFudSIsInVzZXJuYW1lIjoiamFudUBqYW51IiwiaWQiOiI2NDY4NWY3NmVmNTE4MTQxNDQyMzBlYjMiLCJpYXQiOjE2ODQ3MzI2ODV9.C72F3Z08fmLRf6c-sADM_gE_1nocZmYnN3nnXohEngk'
  const formSubmission=async()=>{
    // console.log(currentUser.message)
    if(editExpense==null){
    await axios.post('http://localhost:3000/api/expenses',{
      title:title,amount:expense,date:date,description:description,categories:categories
    },{headers:{
      Authorization:`Bearer ${currentUser.message}`
    }}).then((response)=>{
      console.log(response)
      setTitle('')
      setDescription('')
      setExpense('')
      setDate('')
      setExpenseBtn(false)}
    ).catch((error)=>{console.log(error.message)})}
    else{
      const id=editExpense._id
      await axios.patch(`http://localhost:3000/api/expenses/${id}`,{
        title:title,amount:expense,date:date,description:description,categories:categories
      },{headers:{
        Authorization:`Bearer ${temp}`
      }}).then((data)=>{
        window.location='/'
      }).catch((error)=>{
        console.log(error)
      })
      setExpenseBtn(false)
    }
  }
  return (
      <Modal show={expenseBtn} onHide={()=>setExpenseBtn(false)} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton onClick={()=>setExpenseBtn(false)}>
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
                <Form.Control value={date}  type='date' placeholder='Enter the date' onChange={(e)=>setDate(e.target.value)}/>
              </div>
            </div>
            <Form.Label className='mt-2'>Title</Form.Label>
            <Form.Control value={title}  type='text' placeholder='Enter the title' onChange={(e)=>setTitle(e.target.value)}/>

            <Form.Label className='mt-2'>Description</Form.Label>
            <Form.Control value={description} as="textarea" placeholder='Write the description' onChange={(e)=>setDescription(e.target.value)}/>

            <CategoryDropdown
              className='m-auto'
              categories={categories}
              setCategories={setCategories}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setExpenseBtn(false)}>Close</Button>
          <Button variant="primary" onClick={()=>{
            formSubmission()
            }}>Save changes</Button>
        </Modal.Footer>

      </Modal>
  );
}

export default ExpenseForm;