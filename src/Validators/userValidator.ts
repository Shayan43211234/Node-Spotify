import {body,check,query,header,param} from 'express-validator';
import userSchema from '../model/UserModel';
import { nextTick } from 'process';
export class UserValidator{
    static signup=()=>{
        return [body('name','name is required').isString(),
                body('email','email is required').isEmail().custom((email,{req})=>{
                    return userSchema.findOne({email:email}).then(user=>{
                        if(user){
                            throw new Error("user already exist");
                        }else{
                            return true;
                    }
                    }).catch(e=>{
                        nextTick(e);
                    })
                }),
                body('password','password is required').isString()
                    .isLength({min: 8, max: 20}).withMessage('Password should be from 8-20 Characters only')
    ];
    }
    static login(){
        return [query('email','email is required').isString().custom((email,{req})=>{
            return userSchema.findOne({email:email}).then(user=>{
                if(user){
                    req.user=user;
                    return true;
                }else{
                    throw new Error("user does not exist");
                }
            }).catch(err=>{
                nextTick(err);
            });
        }),
                query('password','password is required').isString()
    ]
    }
}