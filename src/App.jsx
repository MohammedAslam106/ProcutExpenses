import './App.css'
import AddButton from './components/AddButton'
import CategoryForm from './components/AddCategoryForm'
import ExpenseForm from './components/AddExpenseForm'
import {Chart} from './components/Chart'
import ExpenseCard from './components/ExpenseCard'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { sub, subDays } from 'date-fns'
import { userAuth } from './contexts/AuthContext'

function App() {
  const [expenseBtn,setExpenseBtn]=useState(false)
  const [categoryBtn,setCategoryBtn]=useState(false)
  

  const[allExpenses,setAllExpenses]=useState([])

  

  const {currentUser}=userAuth()

  

  const temp='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFudSIsInVzZXJuYW1lIjoiamFudUBqYW51IiwiaWQiOiI2NDY4NWY3NmVmNTE4MTQxNDQyMzBlYjMiLCJpYXQiOjE2ODQ3MzI2ODV9.C72F3Z08fmLRf6c-sADM_gE_1nocZmYnN3nnXohEngk'


  useEffect(()=>{
    const allExpense=async()=>{
    await axios.get('http://localhost:3000/api/expenses',{headers:{
        Authorization:`Bearer ${temp}`
    }}).then((response)=>{
      console.log(response.data)
      setAllExpenses(response.data)
    }).catch((error)=>console.log(error))
    }
    allExpense()
  },[currentUser,expenseBtn])

  console.log(allExpenses)
  const summedExpenses=allExpenses.reduce((acc,exp)=>{
    const date=exp.date.slice(0,10)
    if(date in acc ){
      acc[date]+=exp.amount
    }
    else{
      acc[date]=exp.amount
    }
    return acc
  },{})

  return (
    <div
      
     className='container w-75 '>
        <h1 className='text-center'>Expense Tracker</h1>
        <Chart
          
          data = {{
            labels:Array(15).fill(null).map((_,i)=>subDays(new Date(),i)),
            datasets: [
              {
                label: 'Expenses',
                data: Array(15).fill(null).map((_,i)=>{
                  const date=subDays(new Date(),i).toISOString().slice(0,10)
                  if (date in summedExpenses){
                    return summedExpenses[date]
                  }
                  else{
                    return 0
                  }
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                lineTension: 0.3,
              }
            ],
          }}
        />
        <div className='d-flex flex-wrap gap-2 align-items-center justify-content-center m-2'>
        {allExpenses.map((exp,ind)=>{
          return (
              <ExpenseCard key={ind} expense={exp} />
          )
        })}
        </div>
        <ExpenseForm expenseBtn={expenseBtn} setExpenseBtn={setExpenseBtn}/>
        <CategoryForm categoryBtn={categoryBtn} setCategoryBtn={setCategoryBtn} />
        <AddButton setExpenseBtn={setExpenseBtn} setCategoryBtn={setCategoryBtn}/>

    </div>
  )
}

export default App
