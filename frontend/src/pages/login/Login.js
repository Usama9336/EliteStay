import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const Login=()=> {
    const [credentials,setcredentials]=useState({
        username:undefined,
        password:undefined,
    })
    const {loading,error,dispatch}=useContext(AuthContext)
    const navigate=useNavigate()
    const handlechange=(e)=>{
      setcredentials(prev=>({...prev,[e.target.id]:e.target.value}))
    }

const handleclick=async (e)=>{
e.preventDefault()
dispatch({type:"Login_Start"})
try {
  const res=await axios.post("/auth/login",credentials)
dispatch({type:"Login_Success",payload:res.data.details});
navigate("/")
} catch (error) {
dispatch({type:"Login_Failure",payload:error.response.data})
}
}

  return (
    <div className='mx-[20rem]'>
        <div>
         <input type="text" placeholder='username'  id="username" onChange={handlechange}/> 
         <input type="password" placeholder='password'  id="password" onChange={handlechange}/>
         <button onClick={handleclick} >Login</button>
         {error && <span>{error.message}</span>}   
        </div>
    </div>
  )
}

export default Login