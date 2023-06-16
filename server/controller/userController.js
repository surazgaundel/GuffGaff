const Register = require('../model/userModel');
const bcrypt=require('bcrypt');

module.exports.register = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        //check username is unique or not
        const checkUserName=await Register.findOne({username})
        if(checkUserName){
            return res.json({ msg: "Username already taken", status: false });
        }
            //Check email is unique or not
        const checkUser=await Register.findOne({email})
        if(checkUser){
            return res.json({msg:'You have already registered with this email',status:false});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await Register.create({username,email,password:hashedPassword});
        delete user.password;
        return res.json({msg:'User registered',status:true,user})
    }
    catch(err){
        next(err);
    }
}


module.exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const checkUser=await Register.findOne({email})
        if(!checkUser)
            return res.json({msg:'The given credential is invalid',status:false})
        const checkPassword=await bcrypt.compare(password,checkUser.password)
        if(!checkPassword)
            return res.json({msg:'The given credential is invalid',status:false})
        delete checkUser.password
        return res.json({status:true,checkUser})
    }
    catch(err){
        next(err);
    }
}

module.exports.setAvatar=async(req,res,next)=>{
    try{
        console.log(req.params)
        const avatarImage=req.body.image;
        const userId=req.params.id;
        const userData=await Register.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({
            isSet:userData.isAvatarImageSet,    
            image:userData.avatarImage
        })
    }
    catch(err){
        next(err);
    }
}


module.exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await Register.find({_id:{$ne:req.params.id}}).select(['_id','username','email','avatarImage'])
        return res.json(users)
    }
    catch(err){
        next(err);
    }
}