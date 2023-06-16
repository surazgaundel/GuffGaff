import React from 'react'
import GuffGaff from '../assets/GuffGaff.svg';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate=useNavigate();

  const clearSession=()=>{
    navigate(-1)
    localStorage.clear();
  }

  return (
    <div className="grid grid-cols-2">
        <div>
        <img src={GuffGaff} alt='logo' className='w-80 h-80 object-cover'/>
        </div>
        <div>
          <div className='w-24 h-14 border-2 border-white'>Ram</div>
          <div className='w-24 h-14 border-2 border-white'>Ram</div>
          <div className='w-24 h-14 border-2 border-white'>Ram</div>
          <div className='w-24 h-14 border-2 border-white'>Ram</div>
          <div className='w-24 h-14 border-2 border-white'>Ram</div>
        </div>
        <div>
            <div>Message Box</div>
        </div>
        <button onClick={clearSession}>Logout</button>
    </div>
  )
}
