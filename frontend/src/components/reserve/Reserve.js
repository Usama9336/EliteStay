import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
export default function Reserve({setopen,hotelId}) {

const [selectrooms, setselectrooms] = useState([])

  const {data,loading,error}=useFetch(`hotels/room/${hotelId}`)

const handleselect=(e)=>{
const checked=e.target.checked
const value=e.target.value
setselectrooms(checked?[...selectrooms,value]:selectrooms.filter((item)=>item !==value))
}
const {dates}=useContext(SearchContext)
const getdateinrange=(startdate,enddate)=>{
  const start=new Date(startdate)
  const end=new Date(enddate)
  const date=new Date(start.getTime());
  let dates=[]
  while(data<=end)
  {
    dates.push(new Date(date).getTime()); date.setDate(date.getDate()+1)
  }
  return dates
}
const alldates=getdateinrange(dates[0].startdate,dates[0].enddate)

const isavailable=(roomNumber)=>{
const isfound=roomNumber.unavailableDates.some(date=>alldates.includes(new Date(date).getTime())
)
return !isfound
}

const navigate=useNavigate()

const handleclick=async()=>{
try {
  await Promise.all(selectrooms.map(roomId=>{
const res=axios.put(`/rooms/availability/${roomId}`,{dates:alldates})
return res.data
  }))
  setopen(false)
  navigate("/")
} catch (err) {
  

}


}

  return (
    <div className='bg-[grey] flex justify-center  mx-[40px] my-[40px] position:fixed'>
        <div>
            <FontAwesomeIcon icon={faCircleXmark} className="" onClick={()=>setopen(false)}/>
            <span>Select your Rooms</span>
            {data.map(item=>{
        return      <div>
                <div>
<div>{item.title}</div>
<div>{item.desc}</div>
<div>
  Max people :<b>{item.maxPeople}</b></div>
  <div>{item.price}</div>
  <div>{item.roomNumbers.map(roomNumber=>{
   return <div>
      <label htmlFor="">
        {roomNumber.number}
      </label>
      <input type="checkbox" value={roomNumber._id} onChange={handleselect}/>
      disabled={!isavailable(roomNumber)}
    </div>

  })}</div>
                </div>
              </div>
            })}
            <button onClick={handleclick}>
              Reserve Now!
            </button>
        </div>
    </div>
  )
}

