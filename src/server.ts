import * as express from 'express';
import * as mongoose from 'mongoose';
import bodyParser=require('body-parser');
import {getEnviroment} from "./enviroment/env";
import { SongRouter } from './router/songRouter';
import { ArtistRouter } from './router/artistRouter';
import { UserRouter } from './router/userRouter';

export class server{
    public app:express.Application=express();

    public constructor(){
        this.setConfigaration();
        this.setRoutes();
        this.error404Habdle();
        this.handleErrors();
    }
    setConfigaration(){
        this.crossPolicy();
        this.setMongoDB();
        this.setBodyparser();
    }
    async crossPolicy(){
        this.app.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); 
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
    }
    async setMongoDB(){
        await mongoose.connect(getEnviroment().db_url,{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false }).then(()=>{
            console.log("MongoDB Connected Successfully");
            }).catch(function(){
            console.log("MongoDB connection unsuccessful");
        });
    }
    setBodyparser(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    setRoutes(){
        let songrouter=new SongRouter;
        let artistrouter=new ArtistRouter;
        let userrouter=new UserRouter;
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/song',songrouter.router);
        this.app.use('/api/artist',artistrouter.router);
        this.app.use('/api/user',userrouter.router);
    }
    error404Habdle=()=>{
        this.app.use((req,res)=>{
            res.status(404).json({
                status:"api not found",
                status_code:"404"
            });
        });
    }
    handleErrors(){
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            })
        })
    }
}