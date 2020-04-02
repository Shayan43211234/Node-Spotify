import {Router} from 'express';
import { ImageUpload } from '../Utils/imageUpload';
import { SongValidator } from '../Validators/songValidator';
import { errorCheckMiddleware } from '../GlobalMiddleware/errorCheckMiddleware';
import { SongController } from '../controller/SongController';

export class SongRouter{
    public router:Router=Router();

    public constructor(){   
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes()
    }
    getRoutes(){
        this.router.get('/get/all/song',errorCheckMiddleware.errorCheck,SongController.getAllSong);
        this.router.get('/delete/song/:id',SongValidator.deleteSong(),errorCheckMiddleware.errorCheck,
                            SongController.deleteSong);
    }
    postRoutes(){
        this.router.post('/add/song',SongValidator.addSong(),
                            errorCheckMiddleware.errorCheck,SongController.addSong);
        this.router.post('/add/image',new ImageUpload().multer.single('image'),SongValidator.addImage(),
                            errorCheckMiddleware.errorCheck,SongController.addImage);
    }
    patchRoutes(){
                
    }
    deleteRoutes(){
    
    }
    putRoutes(){
        
    }
}