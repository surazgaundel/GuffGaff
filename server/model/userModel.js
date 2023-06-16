const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const registerSchema= new Schema({
    username:{
        type: String,
        min:3,
        max:15,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:15,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:'',
    }
})

module.exports=mongoose.model('Register',registerSchema);