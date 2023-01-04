import React, { useState } from 'react'
import "./Signup.css"
import axios from './axios';
function Signup() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  function submit(e){
    e.preventDefault()
    window.localStorage.setItem("password",password)
    
    if(password === "alumini"){
      axios.post("/alumini",{
        username:username,
        password:password
      }).then((result)=>{
        console.log(result);
        window.location.href = "/dashboard"
      }).catch((e)=>{
        console.log(e);
      })
    }
    else{
      axios.post("/student",{
        username:username,
        password:password
      }).then((result)=>{
        console.log(result);
        window.location.href = "/dashboard"
      }).catch(e=>{
        console.log(e);
      })
    }
    
  }
  return (
    <div className='form__container'>
     <h1>Sign Up</h1>
     <form onSubmit={submit}>
        <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder='Enter Username' />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter Password' />
        <input type="submit" />
     </form>
    </div>
  )
}

export default Signup