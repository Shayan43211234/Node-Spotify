import {Router} from 'express';
import {UserController} from '../controller/UserController';
import { UserValidator } from '../Validators/userValidator';
import { errorCheckMiddleware } from '../GlobalMiddleware/errorCheckMiddleware';

export class UserRouter{
    public router:Router=Router();

    public constructor(){   
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes()
    }
    getRoutes(){
        this.router.get('/login',UserValidator.login(),errorCheckMiddleware.errorCheck,UserController.login);
    }
    postRoutes(){
        this.router.post('/signup',UserValidator.signup(),errorCheckMiddleware.errorCheck,UserController.signup)
    }
    patchRoutes(){

    }
    deleteRoutes(){

    }
    putRoutes(){

    }
}