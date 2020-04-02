import {Router} from 'express';
import { ArtistController } from '../controller/ArtistController';
import { ArtistValidator } from '../Validators/artistValidator';
import { errorCheckMiddleware } from '../GlobalMiddleware/errorCheckMiddleware';

export class ArtistRouter{
    public router:Router=Router();

    public constructor(){   
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes()
    }
    getRoutes(){
        this.router.get('/get/all/artist',errorCheckMiddleware.errorCheck,
                        ArtistController.getAllArtist);
        this.router.get('/delete/artist/:id',ArtistValidator.deleteArtist(),errorCheckMiddleware.errorCheck,
                        ArtistController.deleteArtist);

    }
    postRoutes(){
        this.router.post('/add/artist',ArtistValidator.addArtist(),errorCheckMiddleware.errorCheck,
                            ArtistController.addArtist);
        this.router.post('/update/artist/:id',ArtistValidator.updateArtist(),errorCheckMiddleware.errorCheck,
                            ArtistController.updateAtrist);
    }
    patchRoutes(){
        
    }
    deleteRoutes(){

    }
    putRoutes(){
        
    }
}