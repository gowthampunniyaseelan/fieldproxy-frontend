import React, { useEffect } from 'react'
import "./DashBoard.css"
import { useState } from 'react'
import axios from './axios';
function DashBoard() {
  const [time,setTime]  = useState("");
  const [date,setDate] = useState("");
  const [username,setUsername] = useState("");
  const [bool,setBool] = useState(false);
  const [scheduleData,setScheduleData] = useState([]);    
  function submit(e){
    e.preventDefault()
    console.log(date)
    axios.post("/schedule",{
      username:username,
      time:time,
      date:date,
      bool:"false",
      count:"1"
    }).then((result)=>{
      setBool(true)
      window.localStorage.setItem("bool",bool)
      console.log(result);
    }).catch(e=>{
      console.log(e);
    })
    setUsername("")
    setTime("")
    setDate("")
  }

 function acceptSchedule(item){
  setBool(false)
  window.localStorage.removeItem("bool");
  const oneData = [...scheduleData]
  axios.put("/change-schedule",{
    data:oneData[item]
  })
  console.log(item);

}
useEffect(()=>{
  axios.get("/sync-schedule").then((result)=>{
    const {data} = result
    setScheduleData(data)
 })
},[])


const today = new Date();
const minDate = new Date(today.setDate(today.getDate())).toISOString().split('T')[0];
const maxDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];


function logout(){
  window.localStorage.removeItem("password")
  window.location.href = "/"
}



  return (
    <div>
    { window.localStorage.getItem("password") === "alumini" ?
     <>
   <table id='student'>
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Date</th>
        <th>Timeslot</th>
        <th>Option</th>
      </tr>
    </thead>
    <tbody>
    {scheduleData.map((data,item)=>(
      <tr key={item}>
      <td>
        {data.username}
      </td>
      <td>
      {data.date}
      </td>
      <td>
      {data.time}
      </td>
    <td>
      <button id='button1' onClick={()=>acceptSchedule(item)}>Accept</button>
      <button id='button2'>Reject</button>
    </td>
      </tr>
      ))} 
    </tbody>
   </table>
    </> : 
    <>
    <h2>Schedule</h2>
    <form onSubmit={submit}>
    <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder='Enter your name' />
    <label htmlFor="slot">Choose the time slot: </label>
    <select name="slot" id="slot" value={time} onChange={e=>setTime(e.target.value)}>
    <option>None</option>
    <option>1pm - 2pm</option>
    <option>4pm - 5pm</option>
    <option>6pm - 7pm</option>
    </select>
    <label htmlFor="date">Choose a date: </label>

    <input type="date" value={date} onChange={e=>setDate(e.target.value)} min={minDate} max={maxDate} />


   {window.localStorage.getItem("bool") ? <input type="submit" disabled={true}/> : <input type="submit"/> }
    </form>
    </>
    }
    <button onClick={logout} className="logout">Logout</button>
    </div>
  )
}

export default DashBoard