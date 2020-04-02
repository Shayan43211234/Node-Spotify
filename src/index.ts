import { server } from './server';

let Srv=new server();
let Server=Srv.app;
let port:number=5000;

Server.listen(port,()=>{
    console.log(`server is listen at port number ${port}`);
});