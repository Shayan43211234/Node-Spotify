import { EncryptPassword } from '../Utils/encryptPassword';
import userSchema from '../model/UserModel';
import { BcryptPassword } from '../Utils/bcryptPassword';

export class UserController{
   
    static async signup(req,res,next){
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        try{
            const hashpassword = await EncryptPassword.password(password);
            
            type user={name,email,password};
            
            const adduser:user={
                name:name,
                password:hashpassword,
                email:email
            };

            await new userSchema(adduser).save().then(user=>{
                if(user){
                    res.send(user);
                }else{
                    res.send("User doesn't save")
                }
            }).catch(e=>{
                next(e);
            })
        }catch(e){
            next(e);
        }
    }

    static  login=async (req,res,next)=>{
        const user=req.user;
        const password=req.query.password;
        try{
            await BcryptPassword.password({plainPassword:password,encryptedPassword:user.password});
            res.json("Login Successfully");
        }catch(e){
            next(e);
        }
    }
}