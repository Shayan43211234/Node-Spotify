import { check,body,query,param,header } from 'express-validator';
import songSchema from '../model/SongModel';
import artistSchema from '../model/ArtistModel';
import { nextTick } from 'process';
export class SongValidator{
    static addSong(){
        return [body('song_name','song name is required').isString(),
                body('dor','date of release(dor) is required'),
                body('artist_id','artist id is required').isArray().custom((artist_id,{req})=>{
                    return artistSchema.findOne({_id:artist_id.item_id}).then(artist=>{
                        return true;
                    }).catch(e=>{
                        nextTick(e);
                    })
                }),
                body('image','image is required').isString()
    ];
    }
    static addImage(){
        return body('image').custom((image, {req}) => {
                    if (req.file) {
                        return true;
                    } else {
                        throw new Error('File not Uploaded');
                    }
                })
    }
    static deleteSong(){
        return [param('id','song id is requried').isString().custom((id,{req})=>{
            return songSchema.findOne({_id:id}).then(song=>{
                if(song){
                    req.song=song;
                    return true;
                }else{
                    throw new Error("song does not exist");
                }
            })
        })];
    }
}