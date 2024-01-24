const express=require('express');
const app=express();

require('dotenv').config();
const morgan=require('morgan');

const cors=require('cors');
const bodyParser=require('body-parser');
const ConnectDB=require('./Database/db');
const UsersRoute=require('./Routes/Users');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))





app.use(UsersRoute);


//"connection" arrow function from db.js file from database folder returns promise.
//asynchronous function returns promise, In "connection" arrow function we used async/await and inside try and catch
ConnectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app listening to port ${process.env.PORT}....`);
    });
});