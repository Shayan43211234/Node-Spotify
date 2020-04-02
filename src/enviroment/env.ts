import {DevEnviroment} from "./dev.env";
import { ProEnviroment } from './pro.env';

export interface Enviroment{
    db_url:string
}
export function getEnviroment(){
    if(process.env.NODE_ENV === "production"){
        return ProEnviroment;
    }
    else{
        return DevEnviroment;
    }
}