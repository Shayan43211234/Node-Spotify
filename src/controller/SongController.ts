import songSchema from '../model/SongModel';
import artistSchema from '../model/ArtistModel';
export class SongController{
    static addSong=async (req,res,next)=>{
        const song_name=req.body.song_name;
        const dor=req.body.dor;
        const artist_id=req.body.artist_id;
        const image=req.body.image;
        try{
            let arr=[];
            for(let i=0;i<artist_id.length;i++){
                arr.push(artist_id[i].item_id);
            }
            const addsong={
                song_name:song_name,
                dor:dor,
                artist_id:arr,
                image:image
            };
            await songSchema.findOne({song_name:addsong.song_name}).then(async song=>{
                if(song){
                    res.send("song already exist")
                }else{
                    await new songSchema(addsong).save().then(song=>{
                        res.send(song);
                    }).catch(e=>{
                        next(e);
                    })
                }
            }).catch(e=>{
                next(e);
            })
        }catch(e){
            next(e);
        }
}
    static async addImage(req,res,next){
        const imageUrl = 'http://localhost:5000/' + req.file.path;
        try {
            res.json(imageUrl);
        } catch (e) {
            next(e);
        }
    }
    static async getAllSong(req,res,next){
        try{
            await songSchema.find().then(async song=>{
                for(let i=0;i<song.length;i++){
                    await artistSchema.find({_id:{ $in: song[i]['artist_id']}},{_id:0}).select('name').then(artist=>{
                        let arr=[];
                        for(let j=0;j<artist.length;j++){
                            if(artist[j]['name']){
                            arr.push(artist[j]['name']);
                            }
                        }
                        song[i]['artist_id']=arr;
                    }).catch(e=>{
                        next(e);
                    })
                }
                res.send(song);
            }).catch(e=>{
                next(e);
            })
        }catch(e){
            next(e);
        }
    }
    static async deleteSong(req,res,next){
        const song_id=req.song._id;
        try{
            await songSchema.findOneAndDelete({_id:song_id}).then(song=>{
                res.send("success");
            }).catch((e)=>{
                res.send(e);
            })
        }catch(e){
            next(e);
        }
    }
}