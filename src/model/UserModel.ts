import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const userSchema=new mongoose.Schema({
   name: {type:String, required:true },
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   create_at:{type:Date,required:true,default:new Date},
   update_at:{type:Date,required:true,default:new Date}
});

export default model ('userSchema',userSchema);