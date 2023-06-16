/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react'
import GuffGaff from '../assets/GuffGaff.svg';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/Routes';

export default function SignUp() {
    const navigate = useNavigate();
    
    const [userSignUp,setUserSignUp]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const toastOption={
        position:'top-right',
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    const handleChange=(e)=>{
        setUserSignUp({...userSignUp,[e.target.name]:e.target.value})
    }
    
    const handleValidation=()=>{
        const {username,password,confirmPassword}=userSignUp;

        if(password !== confirmPassword){
            toast.error('Password should be match',toastOption);
            return false;
        } else if(password.length<6){
            toast.error('Password length must be greater than 6 characters',toastOption);
            return false;
        } else if(username.length<3){
            toast.error('Username must be at least 3 characters',toastOption);
            return false;
        }else{
            return true;
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {username,email,password}=userSignUp;
            await axios.post(registerRoute,{username,email,password})
            .then(({data})=>{
                if(data.status){
                    localStorage.setItem('guff-gaff-user',JSON.stringify(data.user))
                    e.target.reset();
                    return toast.success(data.msg,toastOption);
                }
                return toast.error(data.msg,toastOption);
            })
            .catch(err => toast.error(err.msg,toastOption));
        }
    }
    

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div>
                <img src={GuffGaff} alt='logo' className='w-80 h-80 object-cover'/>
            </div>
            <div className="border border-1 p-5 rounded-md md:w-1/5 lg:w-1/5">
            <h1 className="text-center font-semibold text-3xl my-4">Guff Gaff</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="username">User Name:
                </label>
                <input type='text' name='username' className='rounded-sm' required onChange={handleChange}/>
                <label htmlFor="email">Email:
                </label>
                <input type='email' name='email' className='rounded-sm' required onChange={handleChange}/>
                <label htmlFor="password">Password:
                </label>
                <input type='password' name='password' className='rounded-sm' min={6} max={12} required onChange={handleChange}/>
                <label htmlFor="confirmPassword">Confirm Password:
                </label>
                <input type='password' name='confirmPassword' className='rounded-sm' min={6} max={12} required onChange={handleChange}/>
            <hr className='m-2'/>
                <button className='border border-1 mt-2 bg-blue-600 text-white font-semibold rounded-sm hover:ring-offset-1 ring-0 ring-white  ' type='submit'>Sign Up</button>
            </form>
            </div>
            <div className='mt-3'>
                <h1>I already have an account, <button className='font-semibold hover:underline' onClick={()=>navigate('/login')}>Log In</button></h1>
            </div>
            <ToastContainer/>
        </div>
    )
}
