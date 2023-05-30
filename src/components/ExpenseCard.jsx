import { formatRelative } from 'date-fns'
import Badge from 'react-bootstrap/Badge' 
import DisplayCard from './DisplayCard'
import { useEffect, useState } from 'react'
import EditExpenseForm from './EditExpenseForm'
import ExpenseForm from './AddExpenseForm'


export default function ExpenseCard({expense}){
    const [displayCard,setDisplayCard]=useState(false)
    const [details,setDetails]=useState([])
    const [editExpenseForm,setEditExpenseForm]=useState(false)
    useEffect(()=>{
      setDetails(expense)
    },[displayCard])
    return(
        <div>
        <div className="card" style={{width:'300px', height:'250px'}}>
          <div className="card-body" style={{width:'280px',height:'150px'}}>
            <div className='d-flex justify-content-between'>
              <h5 className="card-title">{expense.amount}</h5>
              <h5 className=''><Badge className='bg-success'>{expense.status}</Badge></h5>
            </div>
            <div className='d-flex justify-content-between'>
              <h6 className="card-subtitle mt-1 text-muted">{expense.title}</h6>
              <span className='text-secondary'>
                {formatRelative(new Date(expense.date), new Date())}  
               
                 {/* {date.slice(0,10)} */}
              </span>
            </div>
            <div className="card-text mt-4">
              <p style={{maxHeight:'20px',overflow:'hidden'}}>{expense.description}</p>
              <p className="d-flex align-items-center flex-wrap gap-2" style={{maxHeight:'25px',overflow:'hidden'}}>
                {expense.categories?.map((category,id) => (
                  <h6 key={id}>
                    <Badge bg="secondary">{category.title}</Badge>
                  </h6>
                ))}
              </p>
            </div>
          </div>
          <div style={{margin:'10px'}} className='d-flex justify-content-end gap-2'>
            <button className='btn btn-secondary' type='button' onClick={()=>{
              setEditExpenseForm(true)
            }}>Edit</button>
            <button  className='btn btn-primary' type='button' onClick={()=>{
              setDisplayCard(true) 
            }}>show more</button>
          </div>
          {/* <Modal.Footer></Modal.Footer> */}
          <DisplayCard show={displayCard}
            onHide={() => setDisplayCard(false)}
            details={details}
          />
          {/* <EditExpenseForm editExpenseForm={editExpenseForm} setEditExpenseForm={setEditExpenseForm} editExpense={details} /> */}
          <ExpenseForm setExpenseBtn={setEditExpenseForm} expenseBtn={editExpenseForm} editExpense={details}/> 
        </div>
        </div>
    )
    

}