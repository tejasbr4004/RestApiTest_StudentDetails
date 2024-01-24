const express=require('express');
const mongoose=require('mongoose');
const Users=require('../Model/UserDetailSchema');

const users_get_all=(req,res)=>{
    Users.find().sort({createdAt:-1})
    .exec()
    .then((usersdetails)=>{

        const response={
            userslength:usersdetails.length,      //don't use length(), use like users.length here...
            Users: usersdetails.map((doc)=>{
               return { 
                    name:doc.name,
                    email:doc.email,
                    userapi_info:{
                        method:'GET',
                        contentType:'application/json',
                        url_individual_details:process.env.hostUrl+process.env.users_route+'/'+doc._id,
                        description:'This will display the individuals of users from the database,go for it if u wish to see,each user'
                   },
                   createdAt:doc.createdAt?doc.createdAt.toLocaleString():null,
                   updatedAt:doc.updatedAt?doc.updatedAt.toLocaleString():null

                }
                     
            })

        };
        res.status(200).json(response);
        
        //or below style, both are okk, above style improves readbility
        // res.status(200).json({
        //            length:usersdetails.length,
        //            users: usersdetails.map(userdetail=>{
        //                     return{
        //                         name:userdetail.name,
        //                         email:userdetail.email,
        //                         userapi_info:{
        //                             method:'GET',
        //                             contentType:'application/json',
                                    //    url_individual_details:process.env.hostUrl+process.env.users_route+'/'+doc._id,
                                    //    description:'This will display the individuals of users from the database,go for it if u wish to see,each user'
        //                        }
        //                    }
        //                })
                   
        // });

    })   
    .catch((error)=>{
        console.log(err)
       res.status(500).json({
        message:'getting users..failed..',
        error:error
       })
    })
}



const user_get_ById=(req,res)=>{
    Users.findById({_id:req.params._id})
    .exec()
    .then((user)=>{
       res.status(200).json({
                message:'here it is,User of provided ID..Thankyou',
               _id:user._id,
               name:user.name,
               email:user.email,
               userapi_info:{
                   method:'GET',
                   contentType:'application/json',
                   url_individual_details:process.env.hostUrl+process.env.users_route+'/'+user._id,
                   description:'This will display the individuals of users from the database,go for it if u wish to see,each user'
              },
              createdAt:user.createdAt?user.createdAt.toLocaleString():null,
              updatedAt:user.updatedAt?user.updatedAt.toLocaleString():null
       })
    })
    .catch((err)=>{
       console.log(err)
       res.status(404).json({
           message:"check with the user id provided in the url...once,because entered url does not match...",
           error:err
       })
   })
   
}



module.exports={
    users_get_all,
    user_get_ById
}