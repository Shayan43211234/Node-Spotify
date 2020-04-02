import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const artistSchema=new mongoose.Schema({
   name:{type:String,required:true},
   dob:{type:String,required:true},
   bio:{type:String,required:true},
   create_at:{type:Date,required:true,default:new Date},
   update_at:{type:Date,required:true,default:new Date}
});

export default model ('artistSchema',artistSchema);