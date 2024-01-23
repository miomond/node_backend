
const mongoose=require("mongoose"); // connect mongoose

// Schema User 

const UserSchema= mongoose.Schema({
    userName:{type:String, required:true},
    password:{type:String,required:true,minLength:6},
    email:{  type:String, required:true,  unique:true,},
    following:[{ type: mongoose.Types.ObjectId,  ref: 'Blog' }],
      roles:{ type:Boolean,default:false }
})


// export Schema User

const User =mongoose.model("User",UserSchema);
module.exports=User;
