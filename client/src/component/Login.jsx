/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import GuffGaff from '../assets/GuffGaff.svg';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/Routes';

export default function Login() {
    const navigate = useNavigate();
    const [userLogin,setUserLogin]=useState({
        email:'',
        password:''
    })

    const toastOption={
        position:'top-right',
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    useEffect(()=>{
        if(localStorage.getItem('guff-gaff-user')){
            navigate('/avatar');
        }
    },[])
    
    const handleChange=(e)=>{
        setUserLogin({...userLogin,[e.target.name]:e.target.value})
    }

    const handleValidation=()=>{
        const {email,password}=userLogin;
        if(email==='' || password===''){
            toast.error('Both email and password are required',toastOption)
            return false;
        }
        return true;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {email, password}= userLogin;
            const {data}= await axios.post(loginRoute,{email,password})
            if(data.status){
                localStorage.setItem('guff-gaff-user',JSON.stringify(data.checkUser))
            }
            return toast.error(data.msg,toastOption);
        }
        
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div>
                <img src={GuffGaff} alt='logo' className='w-80 h-80 object-cover'/>
            </div>
            <div className="border border-1 p-5 rounded-md  md:w-1/5 lg:w-1/5">
            <h1 className="text-center font-semibold text-3xl my-4">Guff Gaff</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="email">Email:
                </label>
                <input type='email' name='email' className='rounded-sm' onChange={handleChange}/>
                <label htmlFor="password">Password:
                </label>
                <input type='password' name='password' className='rounded-sm' onChange={handleChange}/>
            <hr className='m-2'/>
                <button className='border border-1 mt-2 bg-blue-600 text-white font-semibold rounded-sm hover:ring-offset-1 ring-0 ring-white ' type='submit'>Log In</button>
            </form>
            </div>
            <div className='mt-3'>
                <h1>Don&apos;t have an account? <button className='font-semibold hover:underline' onClick={()=>navigate('/register')}>Sign up</button></h1>
            </div>
            <ToastContainer/>
        </div>
    )
}
