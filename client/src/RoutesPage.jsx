import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './component/Login';
import SignUp from './component/SignUp';
import HomePage from './component/HomePage';
import SetAvatar from './component/SetAvatar';
import Chat from './component/Chat';

export default function RoutesPage() {
  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/avatar' element={<SetAvatar/>}/>
        <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </>
  )
}
