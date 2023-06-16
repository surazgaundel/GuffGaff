import React, { useEffect } from 'react'
import axios from 'axios';
import { setAllUsersRoute} from '../utils/Routes';
import {ToastContainer,toast} from 'react-toastify';


export default function Chat() {
    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState('');

    const toastOption={
        position:'top-right',
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    useEffect(()=>{
        fetchUser();
    },[])

    const fetchUser=async()=>{
        try{
            const user=await JSON.parse(localStorage.getItem('guff-gaff-user'))
            const response=axios.get(`${setAllUsersRoute}/${user._id}`)
            const data=response.json();
            setContacts(data);
        }
        catch(err){
            toast.error(err.msg,toastOption);
        }
    }
    console.log(contacts);

  return (
    <div>Chat options</div>
  )
}
