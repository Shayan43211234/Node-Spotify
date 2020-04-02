import artistSchema from '../model/ArtistModel'
export class ArtistController{

   static async addArtist(req,res,next){
    const name=req.body.name;
    const dob=req.body.dob;
    const bio=req.body.bio;
    try{
        const addartist={
            name:name,
            dob:dob,
            bio:bio
        };
        await artistSchema.findOne({name:name}).then(async artist=>{
            if(artist){
                res.send("artist already exist");
            }else{
                await new artistSchema(addartist).save().then(artists=>{
                    res.send(artists);
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
    static async updateAtrist(req,res,next){
        const artist_id=req.artist._id;
        const name=req.body.name;
        const bio=req.body.bio;
        const dob=req.body.dob;
        try{
            await artistSchema.findOne({name:name}).then(async artist=>{
                if(artist){
                    res.send("artist already exist");
                }else{
                    await artistSchema.findOneAndUpdate({_id:artist_id},{
                        name:name,
                        bio:bio,
                        dob:dob,
                        update_at:Date.now()
                    },{new:true}).then(artist=>{
                        res.send(artist);
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
    static async getAllArtist(req,res,next){
        try{
            let arr=[];
            const artists: any = await artistSchema.find();
            for(let i=0;i<artists.length;i++){
                let artist={
                    item_id:artists[i]._id,
                    item_text:artists[i].name,
                    dob:artists[i].dob,
                    bio:artists[i].bio
                };
            arr.push(artist);
            }
            res.json(arr);
        }catch(e){
            next(e);
        }
    }
    static async deleteArtist(req,res,next){
        const artist_id=req.artist._id;
        try{
            await artistSchema.findOneAndDelete({_id:artist_id}).then(artist=>{
                res.send("success");
            }).catch((e)=>{
                res.send(e);
            })
        }catch(e){
            next(e);
        }
    }
}