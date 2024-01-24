const mongoose=require('mongoose');


// mongodb://localhost:27017/yourDatabaseName, for connecting to local mongodb compass instead that replace localhost by 0.0.0.0
//so url be  mongodb://0.0.0.0:27017/yourDatabaseName

const connection=async()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log('successfully Connected to MongoDB...');
    }
   catch(error){
    console.error('Failure..Could not connect to MongoDB...', error);
     }
}

module.exports=connection;