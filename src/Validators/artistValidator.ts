import {body,param, check,query,header} from 'express-validator';
import artistSchema from '../model/ArtistModel';
import { nextTick } from 'process';

export class ArtistValidator{
    static addArtist(){
        return [body('name','name is required').isString(),
                body('dob','date of birth is required'),
                body('bio','bio is required').isString()
    ];
    }
    static updateArtist(){
        return [param('id','artist id is required').isString().custom((id,{req})=>{
            return artistSchema.findOne({_id:id}).then(artist=>{
                if(artist){
                    req.artist=artist;
                    return true;
                }else{
                    throw new Error('artist does not exist');
                }
            }).catch(err=>{
                nextTick(err);
            })
        }),
            body('name','artist name is required').isString(),
            body('bio','bio is required').isString(),
            body('dob','dob is required')
    ];
    }
    static deleteArtist(){
        return [param('id','artist id is requried').isString().custom((id,{req})=>{
            return artistSchema.findOne({_id:id}).then(artist=>{
                if(artist){
                    req.artist=artist;
                    return true;
                }else{
                    throw new Error("artist does not exist");
                }
            })
        })];
    }
}