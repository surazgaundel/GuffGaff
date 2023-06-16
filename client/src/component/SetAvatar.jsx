import {useEffect, useState} from 'react'
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/Routes';
import {Buffer} from 'buffer';

const url='https://api.multiavatar.com'

export default function SetAvatar() {
    const navigate=useNavigate();

    const [avatars,setAvatar]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);

    const toastOption={
        position:'top-right',
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }
    useEffect( () => {
        if (!localStorage.getItem('guff-gaff-user'))
          navigate("/login");
      }, []);

    useEffect(()=>{
        fetchAvatar();   
        setIsLoading(false);
    },[])

    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined){
            toast.error('Please select an avatar',toastOption);
        } else{
            const user=await JSON.parse(localStorage.getItem('guff-gaff-user'))
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar]
            })
            console.log(data);
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem('guff-gaff-user',JSON.stringify(user));
                navigate(`/allUsers/${user._id}`)
            }else{
                toast.error('Error setting avatar, Please try again',toastOption);
            }
        }
    }

    const fetchAvatar=async()=>{
        try{
            const data=[];
            for(let i=0;i<4;i++){
                const image=await axios.get(`${url}/${Math.floor(Math.random()*1000)}`);
                const buffer=new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
                setAvatar(data);
        }catch(err){
            toast.error(err.msg,toastOption)
    }
}



    return (
    <>{isLoading?
        (<img src={loader} alt="loader" className="loader" />):
        (<div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center justify-center font-semibold'>
        <div>Choose an avatar for your profile</div>
        <div className={`flex flex-1 flex-row mb-2`}>
                {avatars.map((avatar,index)=>{
                    return(
                        <div key={index} className={`flex justify-between w-full p-1 m-3 rounded-full transition ease-in-out delay-100 ${selectedAvatar===index?'selected':''}`} >
                            <img className='w-16 h-16 p-1 m-1' src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={()=>setSelectedAvatar(index)}/>
                        </div>
                    )
                })}
            </div>
            <button className='border-2 bg-gray-600 px-2 py-1 rounded-md m-2 font-semibold hover:bg-gray-700 hover:ring-1 ring-white' onClick={setProfilePicture}>Set As Profile Picture</button>
            <ToastContainer/>
        </div> 
    </div>
    )}
    </>
    )
}