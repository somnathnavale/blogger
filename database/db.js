import mongoose from "mongoose"


const connection=async(URL)=>{
    try{
        await mongoose.connect(URL,({useNewUrlParser:true,useUnifiedTopology:true}));
        console.log('connected succcessfully');
    }catch(err){
        console.log(`error while connecting ${err.message}`)
    }
}

export default connection;

