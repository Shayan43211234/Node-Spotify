import * as mongoose from 'mongoose';
import {model} from 'mongoose';


const songSchema=new mongoose.Schema({
    song_name:{type:String,required:true},
    dor:{type:String,required:true},
    image:{type:String,required:true},
    artist_id:[{type:String,required:true}],
    create_at:{type:Date,required:true,default:new Date},
    update_at:{type:Date,required:true,default:new Date}
});


export default model ('songSchema',songSchema);